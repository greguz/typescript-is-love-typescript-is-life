# ko_commonjs_ts470_cjs_interop_star

**Status**: Failed at TypeScript transpilation

- **Build dir**: /tmp/tiltil/b0232387e057eea6154b90a1dee7df91
- **Package type**: commonjs
- **TypeScript version**: ~4.7.0
- **TypeScript project**: projects/cjs_interop.json
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const S = __importStar(require("fluent-json-schema"));
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
code.ts(6,14): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/b0232387e057eea6154b90a1dee7df91/node_modules/fluent-json-schema/types/FluentJSONSchema")'.
code.ts(10,15): error TS2339: Property 'object' does not exist on type 'typeof import("/tmp/tiltil/b0232387e057eea6154b90a1dee7df91/node_modules/fluent-json-schema/types/FluentJSONSchema")'.


```

