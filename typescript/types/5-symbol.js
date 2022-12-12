const sym1: unique symbol = Symbol();
 
// sym2 can only be a constant reference.
// A variable whose type is a 'unique symbol' type must be 'const'.
// let sym2: unique symbol = Symbol();

 
// Works - refers to a unique symbol, but its identity is tied to 'sym1'.
const sym3: typeof sym1 = sym1;
console.log(sym1 == sym3); // true 

//////////////////////////////////////////////////////////////////////////

// Also works.
class A {
  static readonly StaticSymbol: unique symbol = Symbol();
}
