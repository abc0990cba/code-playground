
// shorten call signature
type Log1 = (message: string, userId?: number) => void;

// full call signature, same as shorten
type Log2 = {
  (message: string, userId?: number): void;
}

////////////////////////////////////////////////////////////////////

type DescribableFunction = {
  description: 'string';
  (arg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
