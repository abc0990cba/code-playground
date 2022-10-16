const buf = Buffer.from('abc');

for (x of buf.entries()) {
    console.log(x); // [ 0, 97 ], [ 1, 98 ], [ 2, 99 ]
}