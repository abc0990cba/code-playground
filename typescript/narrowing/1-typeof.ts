function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // padding is number here
  }
  return padding + input; // padding is string here
}

console.log(padLeft(3, 'Hello'));   // "   Hello"
console.log(padLeft("3", 'Hello')); // "3Hello" 

///////////////////////////////////////////////////////////////////////

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    console.log('null');
  }

}

printAll(['a', 'b', 'c']); // 'a', 'b', 'c'
printAll('vbn'); // 'vbn'
printAll(null); // 'null'
