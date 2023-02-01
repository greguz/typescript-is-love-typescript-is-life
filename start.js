import merge from 'deepmerge'
import fs from 'fs-extra'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { EOL, tmpdir } from 'node:os'
import * as path from 'node:path'

const rootDir = process.cwd()

const projectsDir = path.join(rootDir, 'projects')
const reportsDir = path.join(rootDir, 'reports')
const srcDir = path.join(rootDir, 'src')

const tsVersions = [
  '~4.7.0',
  '~4.8.0',
  '~4.9.0'
]

const dependencies = [
  'fluent-json-schema'
]

const types = [
  'commonjs',
  'module'
]

fs.ensureDirSync(reportsDir)
fs.emptyDirSync(reportsDir)

for (const tsVersion of tsVersions) {
  for (const type of types) {
    for (const projectFile of scanDir(projectsDir)) {
      for (const srcFile of scanDir(srcDir)) {
        const tsConfig = fs.readJsonSync(projectFile)

        const tsModule = tsConfig.compilerOptions.module.toLowerCase() === 'commonjs'
          ? 'csj'
          : 'esm'

        const nodeModule = type === 'module'
          ? 'esm'
          : 'csj'

        if (tsModule !== nodeModule) {
          // Ignore useless cases
          continue
        }

        const srcLabel = path.relative(rootDir, srcFile)
        const projectLabel = path.relative(rootDir, projectFile)

        console.log(`running ${srcLabel} with ${projectLabel} on TypeScript ${tsVersion} with type ${type}...`)

        const hash = createHash('md5')
          .update(type + tsVersion + srcLabel + projectLabel)
          .digest('hex')

        const buildDir = path.join(tmpdir(), 'tiltil', hash)
        console.log(`build dir: ${buildDir}`)

        fs.ensureDirSync(buildDir)
        removeButLeaveCache(buildDir)

        mapJsonFile(
          path.join(rootDir, 'package.json'),
          path.join(buildDir, 'package.json'),
          data => {
            data.type = type
            data.dependencies = {}
            data.devDependencies = undefined
          },
          { spaces: 2 }
        )

        run('npm', ['install', `typescript@${tsVersion}`, ...dependencies], {
          cwd: buildDir
        })

        // Apply hacky fix
        fs.copySync(
          path.join(rootDir, 'FluentJSONSchema.proposal.d.ts'),
          path.join(buildDir, 'node_modules/fluent-json-schema/types/FluentJSONSchema.d.ts')
        )
        fs.copySync(
          path.join(rootDir, 'FluentJSONSchema.proposal.js'),
          path.join(buildDir, 'node_modules/fluent-json-schema/src/FluentJSONSchema.js')
        )

        fs.copySync(
          srcFile,
          path.join(buildDir, 'code.ts')
        )

        fs.writeJsonSync(
          path.join(buildDir, 'tsconfig.json'),
          merge.all([
            fs.readJsonSync(path.join(rootDir, 'tsconfig.json')),
            fs.readJsonSync(projectFile),
            { include: ['./code.ts'] }
          ]),
          { spaces: 2 }
        )

        let status = 'Unknown'

        const tsc = run('npx', ['tsc', '-p', 'tsconfig.json'], {
          cwd: buildDir,
          ignoreErrors: true
        })

        let node = null
        if (tsc.status === 0) {
          node = run('node', ['code.js'], {
            cwd: buildDir,
            ignoreErrors: true
          })

          if (node.status === 0) {
            status = 'Success'
          } else {
            status = 'Failed at Node.js execution'
          }
        } else {
          status = 'Failed at TypeScript transpilation'
        }

        console.log(`status: ${status}`)

        const reportCode = getASCIILabel(
          status === 'Success' ? 'ok' : 'ko',
          type,
          `ts${tsVersion}`,
          getFilenameOnly(projectFile),
          getFilenameOnly(srcFile)
        )

        let report = ''

        report += `# ${reportCode}${EOL}`
        report += EOL
        report += `**Status**: ${status}${EOL}`
        report += EOL
        report += `- **Build dir**: ${buildDir}${EOL}`
        report += `- **Package type**: ${type}${EOL}`
        report += `- **TypeScript version**: ${tsVersion}${EOL}`
        report += `- **TypeScript project**: ${projectLabel}${EOL}`
        report += `- **TypeScript code**: ${srcLabel}${EOL}`
        report += EOL

        report += `## package.json${EOL}`
        report += EOL
        report += '```json' + EOL
        report += fs.readFileSync(path.join(buildDir, 'package.json'))
        report += '```' + EOL
        report += EOL

        report += `## tsconfig.json (${projectLabel})${EOL}`
        report += EOL
        report += '```json' + EOL
        report += fs.readFileSync(path.join(buildDir, 'tsconfig.json'))
        report += '```' + EOL
        report += EOL

        report += `## code.ts (${srcLabel})${EOL}`
        report += EOL
        report += '```typescript' + EOL
        report += fs.readFileSync(srcFile)
        report += '```' + EOL
        report += EOL

        report += `## code.js (transpiled file)${EOL}`
        report += EOL
        report += '```javascript' + EOL
        report += fs.readFileSync(path.join(buildDir, 'code.js'))
        report += '```' + EOL
        report += EOL

        if (tsc.status !== 0) {
          report += `## TypeScript transpilation${EOL}`
          report += EOL
          report += '```' + EOL
          report += tsc.stdout + EOL
          report += tsc.stderr + EOL
          report += '```' + EOL
          report += EOL
        }

        if (node) {
          report += `## Node.js execution ${EOL}`
          report += EOL
          report += '```' + EOL
          report += node.stdout + EOL
          report += node.stderr + EOL
          report += '```' + EOL
          report += EOL
        }

        const reportFilename = reportCode + '.md'
        console.log(`report: ${reportFilename}${EOL}`)
        fs.writeFileSync(
          path.join(reportsDir, reportFilename),
          report
        )

        // fs.removeSync(buildDir)
      }
    }
  }
}

/**
 *
 */
function getASCIILabel (...labels) {
  return labels.join('_')
    // forget case sensitivity
    .toLowerCase()
    // Replace simple spaces with underscores
    .replace(/ +/g, '_')
    // remove any other exotic chars
    .replace(/\W+/g, '')
    // remove heading underscores
    .replace(/^_+/g, '')
    // remove trailing underscores
    .replace(/_+$/g, '')
    // remove multiple sequential underscores
    .replace(/_+/g, '_')
}

/**
 *
 */
function run (command, args = [], options = {}) {
  console.log(`${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, options)
  if (result.status !== 0 && !options.ignoreErrors) {
    throw new Error('Command failed')
  }
  return result
}

/**
 *
 */
function mapJsonFile (sourceFile, targetFile, callback, options) {
  const data = fs.readJsonSync(sourceFile, options)
  callback(data)
  fs.writeJsonSync(targetFile, data, options)
  return data
}

/**
 * Filepaths iterable of a dir.
 */
function * scanDir (dir) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    yield path.join(dir, item)
  }
}

/**
 *
 */
function getFilenameOnly (file) {
  return path.basename(file, path.extname(file))
}

/**
 *
 */
function removeButLeaveCache (dir) {
  for (const item of fs.readdirSync(dir)) {
    if (
      item !== 'node_modules' &&
      item !== 'package.json' &&
      item !== 'package-lock.json'
    ) {
      fs.removeSync(path.join(dir, item))
    }
  }
}
