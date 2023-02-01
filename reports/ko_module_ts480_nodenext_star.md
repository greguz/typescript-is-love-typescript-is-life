# ko_module_ts480_nodenext_star

**Status**: Failed at TypeScript transpilation

- **Build dir**: /tmp/tiltil/b8f5f5a43c156c4eec232288aa2f914d
- **Package type**: module
- **TypeScript version**: ~4.8.0
- **TypeScript project**: projects/nodenext.json
- **TypeScript code**: src/star.ts

## package.json

```json
{
  "name": "typescript-is-love-typescript-is-life",
  "private": true,
  "version": "0.0.0",
  "description": "",
  "type": "module",
  "scripts": {
    "start": "node start.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "typescript",
    "test",
    "compiler",
    "options"
  ],
  "author": "Giacomo Gregoletto",
  "license": "MIT",
  "dependencies": {
    "fluent-json-schema": "^4.0.0",
    "typescript": "~4.8.0"
  }
}
```

## tsconfig.json (projects/nodenext.json)

```json
{
  "compilerOptions": {
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "noEmitOnError": false,
    "removeComments": false,
    "skipLibCheck": false,
    "sourceMap": false,
    "strict": false,
    "target": "ES2020",
    "typeRoots": [
      "./node_modules/@types",
      "./typings"
    ],
    "useUnknownInCatchVariables": false
  },
  "include": [
    "./code.ts"
  ]
}
```

## code.ts (src/star.ts)

```typescript
import * as S from 'fluent-json-schema'

if (typeof S !== 'object') {
  throw new Error('Expected an object.')
}
if (typeof S.object !== 'function') {
  throw new Error('Almost perfect... but not quite.')
}

console.log(S.object().additionalProperties(true).valueOf())
```

## code.js (transpiled file)

```javascript
import * as S from 'fluent-json-schema';
if (typeof S !== 'object') {
    throw new Error('Expected an object.');
}
if (typeof S.object !== 'function') {
    throw new Error('Almost perfect... but not quite.');
}
console.log(S.object().additionalProperties(true).valueOf());
```

## TypeScript transpilation

```
code.ts(6,14): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/b8f5f5a43c156c4eec232288aa2f914d/node_modules/fluent-json-schema/types/FluentJSONSchema")'.
code.ts(10,15): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/b8f5f5a43c156c4eec232288aa2f914d/node_modules/fluent-json-schema/types/FluentJSONSchema")'.


```

