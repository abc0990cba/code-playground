const str = "test";
const iterator = str[Symbol.iterator]();

while(true) {
    const { value, done } = iterator.next();
    if(done) {
        break;
    }
    console.log(value);
}

// Output:
// t e s t
