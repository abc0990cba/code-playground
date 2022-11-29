async function* generateSequence(start = 1, end = 3) {
    for(let i = start; i <= end; ++i) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

(async () => {
    for await(value of generateSequence()) {
        console.log(value); // 1 ..1sec.. 2 ..1sec.. 3
    }
})()
