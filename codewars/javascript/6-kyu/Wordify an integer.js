// 6 kyu
// rdify an integer
// https://www.codewars.com/kata/553a2461098c64ae53000041

// Task Description:
// Turn a given number (an integer > 0, < 1000) into the equivalent English words. For the purposes of this kata,
// no hyphen is needed in numbers 21-99.
// Examples:
// wordify(1) == "one"
// wordify(12) == "twelve"
// wordify(17) == "seventeen"
// wordify(56) == "fifty six"
// wordify(90) == "ninety"
// wordify(326) == "three hundred twenty six"
// Based on "Speech module" mission from Checkio.

const WORDS_NUMBERS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90
};

const NUMBERS_WORDS = {};
Object.keys(WORDS_NUMBERS)
      .forEach(key => NUMBERS_WORDS[WORDS_NUMBERS[key]] = key);


function wordify(num) {
  
  if (NUMBERS_WORDS[num]) {
    return NUMBERS_WORDS[num];
  }
  
  let arr = [];
  let str = num.toString().split('').reverse();
  
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i].padEnd(i + 1, 0));
  }
  
  if (NUMBERS_WORDS[num.toString().slice(-2)]) {
    return  NUMBERS_WORDS[str[str.length - 1]] + " hundred " + NUMBERS_WORDS[num.toString().slice(-2)]
  }
  
  return (
    arr.filter(str => parseInt(str))
       .map(v => (NUMBERS_WORDS[v] ? NUMBERS_WORDS[v] : NUMBERS_WORDS[v[0]] + " hundred"))
       .reverse().join(' ')
  );
}
