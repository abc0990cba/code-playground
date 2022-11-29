function* generate() {
    let result = yield 1;
    yield 2 * result;
}

const generator = generate();

try {
    generator.throw(new Error('Error!'));
} catch(error) {
    console.log(error.message);
}

console.log(generator.next());
console.log(generator.next(2));

// Output:
// Error!
// { value: undefined, done: true }
// { value: undefined, done: true }
