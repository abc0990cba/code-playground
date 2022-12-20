// 6 kyu
// Look and say numbers
// https://www.codewars.com/kata/53ea07c9247bc3fcaa00084d


// Task Description:
// There exists a sequence of numbers that follows the pattern
//           1
//          11
//          21
//         1211
//        111221
//        312211
//       13112221
//      1113213211
//           .
//           .
//           .
// Starting with "1" the following lines are produced by "saying what you see", so that line two is "one one", line three is "two one(s)", line four is "one two one one".
// Write a function that given a starting value as a string, returns the appropriate sequence as a list. The starting value can have any number of digits. The termination condition is a defined by the maximum number of iterations, also supplied as an argument.

// Solution 1
function lookAndSay(data, length) {
  // . matches any character (except for line terminators)
  // * matches the previous token between zero and unlimited times, as many times as possible, giving back as needed (greedy)
  const regExp = new RegExp(/(.)\1*/, 'g');
  
  return Array.from(
    { length },
    (v, i) => (data = data.replace(regExp, m => m.length + m[0]))
  );
}

// Solution 2
function lookAndSay2(data, length) {
  const next = (token) => '' + token.length + token[0];
  const process= () => data = data.match(/(\d)\1*/g).map(next).join('');
  return Array.apply(0, Array(length)).map(process);
}
