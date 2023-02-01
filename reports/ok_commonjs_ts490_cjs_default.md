# ok_commonjs_ts490_cjs_default

**Status**: Success

- **Build dir**: /tmp/tiltil/4a93e962fb3c5f47e627111ce596e686
- **Package type**: commonjs
- **TypeScript version**: ~4.9.0
- **TypeScript project**: projects/cjs.json
- **TypeScript code**: src/default.ts

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
    "typescript": "~4.9.0"
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_json_schema_1 = require("fluent-json-schema");
if (typeof fluent_json_schema_1.default !== 'object') {
    throw new Error('Expected an object.');
}
if (typeof fluent_json_schema_1.default.object !== 'function') {
    throw new Error('Almost perfect... but not quite.');
}
console.log(fluent_json_schema_1.default.object().additionalProperties(true).valueOf());
```

## Node.js execution 

```
{
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: true
}


```

