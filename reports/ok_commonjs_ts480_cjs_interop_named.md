# ok_commonjs_ts480_cjs_interop_named

**Status**: Success

- **Build dir**: /tmp/tiltil/c77c7b08ad6996fdbeb2426b945b6aa4
- **Package type**: commonjs
- **TypeScript version**: ~4.8.0
- **TypeScript project**: projects/cjs_interop.json
- **TypeScript code**: src/named.ts

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
    "typescript": "~4.8.0"
  }
}
```

## tsconfig.json (projects/cjs_interop.json)

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
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

## code.ts (src/named.ts)

```typescript
import { S } from 'fluent-json-schema'

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
if (typeof fluent_json_schema_1.S !== 'object') {
    throw new Error('Expected an object.');
}
if (typeof fluent_json_schema_1.S.object !== 'function') {
    throw new Error('Almost perfect... but not quite.');
}
console.log(fluent_json_schema_1.S.object().additionalProperties(true).valueOf());
```

## Node.js execution 

```
{
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: true
}


```

