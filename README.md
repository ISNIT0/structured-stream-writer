# StructuredStreamWriter
A utility for stream-writing CSV and JSON files.

![npm](https://img.shields.io/npm/v/structured-stream-writer.svg) [![CodeFactor](https://www.codefactor.io/repository/github/isnit0/structured-stream-writer/badge)](https://www.codefactor.io/repository/github/isnit0/structured-stream-writer) [![Build Status](https://travis-ci.org/ISNIT0/structured-stream-writer.svg?branch=master)](https://travis-ci.org/ISNIT0/structured-stream-writer) [![codecov](https://codecov.io/gh/isnit0/structured-stream-writer/branch/master/graph/badge.svg)](https://codecov.io/gh/isnit0/structured-stream-writer) 
![NPM License](https://img.shields.io/npm/l/structured-stream-writer.svg)



## Usage
```bash
npm i structured-stream-writer
```
```typescript
import { StructuredStreamWriter, StructuredFormat } from 'structured-stream-writer';
const sswJSON = new StructuredStreamWriter(StructuredFormat.JSON, outPath);

await sswJSON.writeItem({
    item: 1,
    text: 'hello',
});

sswJSON.done();

console.log(
    readFileSync(outPath, 'UTF8'),
);
/*
*  [{item:1,text:"hello"}]
*/

const sswCSV = new StructuredStreamWriter(StructuredFormat.CSV, outPath, ['item', 'text']);

await sswCSV.writeItem({
    item: 1,
    text: 'hello',
});

sswCSV.done();

console.log(
    readFileSync(outPath, 'UTF8'),
);
/* 
*  item,text
*  1,hello
*/
```

## Used By
- [VitalsScraper](https://github.com/commercetest/vitals-scraper)
- [SocietyScraper](#)

## License - MIT

[./LICENSE](./LICENSE)