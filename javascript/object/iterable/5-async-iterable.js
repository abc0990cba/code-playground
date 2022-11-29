let asyncRange = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { 
    return {
      current: this.from,
      last: this.to,

      async next() {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { 
              done: false,
              value: this.current++ 
          };
        } else {
          return {
              done: true 
          };
        }
      }
    };
  }
};

(async () => {
  for await (let value of asyncRange) {
    console.log(value); // 1 ..1sec.. 2 ..1sec.. 3 ..1sec.. 4 ..1sec.. 5
  }
})()

// let arr = [...asyncRange] - will not work for async iterator
