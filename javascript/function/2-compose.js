// https://itnext.io/write-better-javascript-function-composition-with-pipe-and-compose-93cc39ab16ee

const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);

const compose = (...fns) => (x) =>
    fns.reduceRight((res, fn) => fn(res), x);

const price = 200;

// Without compose
const discount1 = normalizePrice(divide100(multiply20(price)));
console.log("discount1:", discount1); // 40.00

// With compose
const calcDiscount = compose(
    normalizePrice,
    divide100,
    multiply20);
const discount2 = calcDiscount(price);
console.log("discount2:", discount2); // 40.00

const addPrefix = (price) => "$" + String(price); // $40.00
const calcDiscountWithPrefix = compose(
    addPrefix,
    normalizePrice,
    divide100,
    multiply20
);
const discount3 = calcDiscountWithPrefix(price);
console.log("discount3:", discount3); // $40.00