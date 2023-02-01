# ok_module_ts480_nodenext_named

**Status**: Success

- **Build dir**: /tmp/tiltil/af969cf57562d0607c2c3dfbdd9b2b2b
- **Package type**: module
- **TypeScript version**: ~4.8.0
- **TypeScript project**: projects/nodenext.json
- **TypeScript code**: src/named.ts

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
import { S } from 'fluent-json-schema';
if (typeof S !== 'object') {
    throw new Error('Expected an object.');
}
if (typeof S.object !== 'function') {
    throw new Error('Almost perfect... but not quite.');
}
console.log(S.object().additionalProperties(true).valueOf());
```

## Node.js execution 

```
{
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: true
}


```

