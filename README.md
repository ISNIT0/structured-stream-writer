# StructuredStreamWriter
A utility for stream-writing CSV and JSON files.

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