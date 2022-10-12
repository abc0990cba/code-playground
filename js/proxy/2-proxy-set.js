let obj = {};

obj = new Proxy(obj, {
    set: function (target, prop, value, receiver) {
        if (typeof value == "number") {
            target[prop] = value;
            console.log("property set: " + prop + " = " + value);
            return true;
        } else {
            console.log("property '" + prop + "' must be a number.");
            return false;
        }

    }
})

obj.a = 1;
obj.b = "str";

console.log(obj);