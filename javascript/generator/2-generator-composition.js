function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
      yield i;
  }
}

function* generatePasswordCodes() {
  yield* generateSequence(48, 57); // 0..9
  yield* generateSequence(65, 90); // A..Z
  yield* generateSequence(97, 122); // a..z
}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str);
// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
