const fn = function<T>(value: T): T {
  return value;
}

///////////////////////////////////////////////////////////

interface GenericIdentityFn1 {
  <Type>(arg: Type): Type;
}

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity1: GenericIdentityFn1 = identity;
let myIdentity2: GenericIdentityFn2<number> = identity;

///////////////////////////////////////////////////////////

function fun<Type>(arg: Type): Type {
  return arg;
}

interface GenericIdentityFn4 {
  <Type>(arg: Type): Type;
}


interface GenericIdentityFn5<Type> {
  (arg: Type): Type;
}

// object literal form
let myIdentity3: { <Type>(arg: Type): Type } = fun;

// interface form is same as object literal form above
let myIdentity4: GenericIdentityFn4 = identity;

// with the parameter of the whole interface
let myIdentity5: GenericIdentityFn5<number> = identity;
