let asyncRange = {
  from: 1,
  to: 3,
  
  // same as [Symbol.asyncIterator]: async function*()
  async *[Symbol.asyncIterator]() { 
    for(let value = this.from; value <= this.to; value++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of asyncRange) {
    alert(value); // 1 ..1sec.. 2 ..1sec.. 3
  }
})();
