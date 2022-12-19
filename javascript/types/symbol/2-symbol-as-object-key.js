const prop = Symbol('prop');

const obj = {
    propA: 'a',
    [prop]: 'b',
}

console.log(obj); // { propA: 'a', [Symbol(prop)]: 'b' }
console.log(obj.prop); // undefined
console.log(obj[prop]); // 'b'

for(let val in obj) {
    console.log(val); // 'propA'
}

for(let key of Object.keys(obj)) {
    console.log(obj[key]); // 'a'
}

const obj2 = Object.assign({}, obj);
console.log(obj2); // { propA: 'a', [Symbol(prop)]: 'b' }
