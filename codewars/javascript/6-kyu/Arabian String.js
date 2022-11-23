// 6 kyu
// Arabian String
// https://www.codewars.com/kata/525821ce8e7b0d240b002615

// Task Description:
// You must create a method that can convert a string from any format into CamelCase. This must support symbols too.
// Don't presume the separators too much or you could be surprised.
// Tests
// camelize("example name")   // => ExampleName
// camelize("your-NaMe-here") // => YourNameHere
// camelize("testing ABC")    // => TestingAbc

// Solution
function camelize(str) {
  const separator = ' ';
  // [^a-z0-9]  - match a single character not present in the list of numbers and symbols
  // i modifier - insensitive. Case insensitive
  // g modifier - global. All matches (don't return after first match)
  const regExp = new RegExp(/[^a-z0-9]/, 'gi');
  
  const capitalize = (str) => str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
  
  return (
    str.replace(regExp, separator)
       .split(separator)
       .map(capitalize)
       .join('')
  )
}
