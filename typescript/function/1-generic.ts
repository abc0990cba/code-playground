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
