const numbers = {
    *[Symbol.iterator](): IterableIterator<number> {
        for (let i = 0; i < 5; ++i) {
            yield i;
        }
    }
}

for (let x of numbers) {
    console.log(x);
}

const arr = [...numbers];
console.log(arr);

const [first, second, ...rest] = numbers;

console.log('first: ' + first);
console.log('second: ' + second);
console.log('rest: ' + rest);