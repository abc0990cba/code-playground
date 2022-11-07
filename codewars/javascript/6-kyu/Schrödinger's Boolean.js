// 6 kyu
// Schrödinger's Boolean
// https://www.codewars.com/kata/5a5f9f80f5dc3f942b002309

// Task description:
// Can a value be both true and false?
// Define omniBool so that it returns true for the following:
// omniBool == true && omniBool == false

// Solution 1
// The valueOf() method of Object converts the this value to an object.
// This method is meant to be overridden by derived objects
// for custom type conversion logic.
// JavaScript calls the valueOf method to convert an object to a primitive value.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
const omnibool1 = {
  value: true,
  valueOf: () => this.value =! this.value
}

// Solution 2
class OmniBool{
  constructor() {
    this.value = false;
  }
}

// The Symbol.toPrimitive well-known symbol specifies a method that accepts
// a preferred type and returns a primitive representation of an object.
// It is called in priority by all type coercion algorithms.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
OmniBool.prototype[Symbol.toPrimitive] = function() { 
  this.value = !this.value;
  return this.value;
};
const omnibool2 = new OmniBool();
