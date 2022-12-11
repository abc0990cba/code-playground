function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3 };
 
getProperty(x, "a"); // OK

// Argument of type '"m"' is not
// assignable to parameter of type '"a" | "b" | "c"
// getProperty(x, "m"); 
