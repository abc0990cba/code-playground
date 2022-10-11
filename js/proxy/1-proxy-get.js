let obj = {
    a: 1,
    b: 2,
    c: 3
};

obj = new Proxy(obj, {
    get: function (target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0;
        }
    }
})

console.log(obj.a);
console.log(obj.b);
console.log(obj.c);
console.log(obj.aa);