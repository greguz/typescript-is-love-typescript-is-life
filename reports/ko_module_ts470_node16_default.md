# ko_module_ts470_node16_default

**Status**: Failed at TypeScript transpilation

- **Build dir**: /tmp/tiltil/f72045ea22405111f76258139cfdc178
- **Package type**: module
- **TypeScript version**: ~4.7.0
- **TypeScript project**: projects/node16.json
- **TypeScript code**: src/default.ts

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
    "typescript": "~4.7.0"
  }
}
```

## tsconfig.json (projects/node16.json)

```json
{
  "compilerOptions": {
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "module": "Node16",
    "moduleResolution": "Node16",
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

## code.ts (src/default.ts)

```typescript
import S from 'fluent-json-schema'

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
import S from 'fluent-json-schema';
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
code.ts(6,14): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/f72045ea22405111f76258139cfdc178/node_modules/fluent-json-schema/types/FluentJSONSchema")'.
code.ts(10,15): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/f72045ea22405111f76258139cfdc178/node_modules/fluent-json-schema/types/FluentJSONSchema")'.


```

