import { StructuredStreamWriter, StructuredFormat } from '../';
import test from 'blue-tape';
import { join } from 'path';
import { tmpdir } from 'os';
import { readFileSync } from 'fs';

test('JSON Stream Writer', async (t) => {
    const outPath = join(tmpdir(), `test-${Date.now()}.json`);
    const ssw = new StructuredStreamWriter(StructuredFormat.JSON, outPath);

    await ssw.writeItem({
        item: 1,
        text: 'one',
    });
    await ssw.writeItem({
        item: 2,
        text: 'two',
    });
    await ssw.writeItem({
        item: 3,
        text: 'three',
    });
    await ssw.writeItem({
        item: 4,
        text: 'four',
    });

    ssw.done();
    t.ok(`Successfully written 4 items to [${outPath}]`);

    const data = require(outPath);
    t.equal(data.length, 4, `Correct number of items written`);
    t.equal(data[0].item, 1, `First item is correct`);
    t.equal(data[3].item, 4, `Last item is correct`);
});

test('CSV Stream Writer', async (t) => {
    const outPath = join(tmpdir(), `test-${Date.now()}.csv`);
    const ssw = new StructuredStreamWriter(StructuredFormat.CSV, outPath, ['item', 'text']);

    await ssw.writeItem({
        item: 1,
        text: 'one',
    });
    await ssw.writeItem({
        item: 2,
        text: 'two',
    });
    await ssw.writeItem({
        item: 3,
        text: 'three',
    });
    await ssw.writeItem({
        item: 4,
        text: 'four',
    });

    ssw.done();
    t.ok(`Successfully written 4 items to [${outPath}]`);

    const data = readFileSync(outPath, 'UTF8').trim().split('\n');
    t.equal(data.length, 5, `Correct number of items written (4 + header)`);
    t.equal(data[0], `item,text`, `Header written correctly`);
    t.equal(data[4], `4,four`, `Last row written correctly`);

    await t.throws(() => {
        const _keep = new StructuredStreamWriter(StructuredFormat.CSV, outPath);
    }, `Fails to create CSV SSW with no headers`);
});
