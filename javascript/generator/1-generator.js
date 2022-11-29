function* generate() {
    yield 1;
    yield 2;
    return 3;
}

const generator = generate();
console.log(generator); // // [object Generator]

const { value, done } = generator.next();
console.log(value, done); // 1 false

const res2 = generator.next();
console.log(res2.value, res2.done); // 2 false

const res3 = generator.next();
console.log(res3.value, res3.done); // 3 true

const res4 = generator.next();
console.log(res4.value, res4.done); // undefined true

const generator2 = generate();
for(val of generator2) {
    console.log(val);  // 1, 2 !!! not 3
}

const arr = [...generate()];
console.log(arr); // [1, 2]
