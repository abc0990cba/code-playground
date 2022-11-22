// 6 kyu
// +1 Array
// https://www.codewars.com/kata/5514e5b77e6b2f38e0000ca9


// Task Description:
// Given an array of integers of any length, return an array that has 1 added to the value represented by the array.
// the array can't be empty
// only non-negative, single digit integers are allowed
// Return nil (or your language's equivalent) for invalid inputs.
// Examples:
// For example the array [2, 3, 9] equals 239, adding one would return the array [2, 4, 0].
// [4, 3, 2, 5] would return [4, 3, 2, 6]

// Solution
// https://forum.freecodecamp.org/t/got-on-codewars-js-challenge/454257/19
// More specifically, to solve this you are to add 1 to the array from the end
// to the beginning, taking into consideration the following two cases:

// 1: When the element becomes larger than 9 after adding 1
// 2: when that element that is larger than 9 is also the element at index 0.

function upArray(arr) {
    if (arr.length === 0) {
        return null;
    }
    let carry = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] > 9 || arr[i] < 0) {
            return null;
        }

        if (carry > 0) {
            arr[i] += carry;
            carry = Math.floor(arr[i] / 10);
            arr[i] = arr[i] % 10;
        }
    }

    if (carry > 0) {
        arr.unshift(carry)
    }

    return arr;
}

// Solution 2:
const upArray = arr => {
    if (!arr.length) return null;
    if (arr.some(val => val < 0 || val > 9)) return null;

    const str = arr.join(``);
    // _ - the matched substring.
    // $1 and $1 -  string found by a capture group
    // (including named capturing groups),
    const replacer = (_, $1, $2) => ++$1 + `0`.repeat($2.length);
    const arrOfChar = [...str.replace(/(\d)(9*$)/, replacer)];
    return arrOfChar.map(Number);
}
