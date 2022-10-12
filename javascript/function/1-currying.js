function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args)
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

const result1 = curriedSum(1)(2)(3); // 6
console.log(result1);

const result2 = curriedSum(1)(2, 1); // 4
console.log(result2);