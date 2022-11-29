const range = {
    from: 1,
    to: 5,
    *[Symbol.iterator]() {
        for(let value = this.from; value <= this.to; value++) {
          yield value;
        }
    }
}

const arr = [...range];
console.log(arr); // [1, 2, 3, 4, 5]

for(let value of range) {
    console.log(value); // 1 2 3 4 5    
}
