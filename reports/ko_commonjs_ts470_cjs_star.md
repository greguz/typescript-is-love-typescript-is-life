# ko_commonjs_ts470_cjs_star

**Status**: Failed at TypeScript transpilation

- **Build dir**: /tmp/tiltil/be56024a72a2cfaca67113a315d745c8
- **Package type**: commonjs
- **TypeScript version**: ~4.7.0
- **TypeScript project**: projects/cjs.json
- **TypeScript code**: src/star.ts

## package.json

```json
{
  "name": "typescript-is-love-typescript-is-life",
  "private": true,
  "version": "0.0.0",
  "description": "",
  "type": "commonjs",
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

## tsconfig.json (projects/cjs.json)

```json
{
  "compilerOptions": {
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "module": "CommonJS",
    "moduleResolution": "node",
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const S = require("fluent-json-schema");
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
code.ts(6,14): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/be56024a72a2cfaca67113a315d745c8/node_modules/fluent-json-schema/types/FluentJSONSchema")'.
code.ts(10,15): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/be56024a72a2cfaca67113a315d745c8/node_modules/fluent-json-schema/types/FluentJSONSchema")'.


```

