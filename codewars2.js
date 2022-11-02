// Description:
// Move the first letter of each word to the end of it,
//then add "ay" to the end of the word. Leave punctuation marks untouched.

// Examples
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

// Solution 1
function pigIt(str) {
  // 1st Capturing Group (\w):
  // \w matches any word character (equivalent to [a-zA-Z0-9_])
  
  // 2nd Capturing Group (\w*):
  // \w matches any word character (equivalent to [a-zA-Z0-9_])
  // * matches the previous token between zero and unlimited times, as many times as possible,
  // giving back as needed (greedy)
  
  // 3rd Capturing Group (\s|$):
  // -- 1st Alternative \s:
  // --    \s matches any whitespace character (equivalent to [\r\n\t\f\v])
  // -- 2nd Alternative $:
  // --    $ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
  
  // Global pattern flags 
  // g modifier: global. All matches (don't return after first match)
 
  return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3");
}

// Solution 2
function pigIt(str) {
  return str.replace(/\w+/g, (word) => {
    return word.slice(1) + word[0] + 'ay';
  });
}
