import fs from 'fs-extra'
import { spawnSync } from 'node:child_process'
import { EOL } from 'node:os'
import * as path from 'node:path'

const rootDir = process.cwd()

const buildDir = path.join(rootDir, 'build')
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

fs.ensureDirSync(buildDir)
fs.emptyDirSync(buildDir)

for (const projectFile of scanDir(projectsDir)) {
  for (const srcFile of scanDir(srcDir)) {
    for (const tsVersion of tsVersions) {
      for (const type of types) {
        const srcLabel = path.relative(rootDir, srcFile)
        const projectLabel = path.relative(rootDir, projectFile)

        const hash = getASCIILabel(
          type,
          `ts${tsVersion}`,
          path.basename(projectFile),
          path.basename(srcFile)
        )

        console.log(`running ${srcLabel} with ${projectLabel} on TypeScript ${tsVersion} with type ${type}...`)
        console.log(`hash: ${hash}`)

        fs.copySync(
          srcFile,
          path.join(buildDir, 'code.ts')
        )

        mapJsonFile(
          projectFile,
          path.join(buildDir, 'tsconfig.json'),
          data => {
            data.include = ['./code.ts']
          },
          { spaces: 2 }
        )

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

        run('npm', ['install', `typescript@${tsVersion}`], {
          cwd: buildDir
        })

        if (dependencies.length > 0) {
          run('npm', ['install', ...dependencies], {
            cwd: buildDir
          })
        }

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

        // CommonJS

        let report = ''

        report += `package type: ${type}${EOL}`
        report += `typescript code file: ${srcLabel}${EOL}`
        report += `typescript project file: ${projectLabel}${EOL}`
        report += `status: ${status}${EOL}`
        report += EOL
        report += EOL

        report += srcLabel + EOL
        report += '-------------------------------------------------' + EOL
        report += fs.readFileSync(srcFile) + EOL + EOL

        report += projectLabel + EOL
        report += '-------------------------------------------------' + EOL
        report += fs.readFileSync(projectFile) + EOL + EOL

        report += `Transpiled file${EOL}`
        report += '-------------------------------------------------' + EOL
        report += fs.readFileSync(path.join(buildDir, 'code.js')) + EOL + EOL

        report += `TypeScript transpilation ${EOL}`
        report += '-------------------------------------------------' + EOL
        if (tsc.stdout.length) {
          report += tsc.stdout + EOL
        }
        if (tsc.stderr.length) {
          report += tsc.stderr + EOL
        }
        report += EOL

        if (node) {
          report += `Node.js execution ${EOL}`
          report += '-------------------------------------------------' + EOL
          if (node.stdout.length) {
            report += node.stdout + EOL
          }
          if (node.stderr.length) {
            report += node.stderr + EOL
          }
          report += EOL
        }

        fs.writeFileSync(
          path.join(reportsDir, `${hash}.txt`),
          report
        )
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
  const files = fs.readdirSync(dir)
  for (const file of files) {
    yield path.join(dir, file)
  }
}
