async function* generateSequence(start = 1, end = 3, ms = 1000) {
    for(let i = start; i <= end; ++i) {
        await new Promise(resolve => setTimeout(resolve, ms));
        yield i;
    }
}

(async () => {
    for await(value of generateSequence()) {
        console.log(value); // 1 ..1sec.. 2 ..1sec.. 3
    }
})()

const generator = generateSequence(4, 6, 500);
console.log(generator); // Object [AsyncGenerator] {}

(async () => {
    console.log(await generator.next()); // { value: 4, done: false }
    console.log(await generator.next()); // { value: 5, done: false }
})()
