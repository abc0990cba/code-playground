interface Array<T> {
  zip<U>(list: U[]): [T, U][]
}

Array.prototype.zip = function<T, U> (
  this: T[],
  list: U[]
): [T, U][] {
  return this.map((t, i) => [t, list[i]]);
};

const a = [1, 2, 3].zip(['a', 'b', 'c']); // [number, string][]

console.log(a); // [[1, "a"], [2, "b"], [3, "c"]] 
