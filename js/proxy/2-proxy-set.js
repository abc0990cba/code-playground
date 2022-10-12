let obj = {};

obj = new Proxy(obj, {
    set: function (target, prop, value, receiver) {
        target[prop] = value;
        console.log("property set: " + prop + " = " + value);
        return true;
    }
})

obj.a = 1;

console.log(obj);