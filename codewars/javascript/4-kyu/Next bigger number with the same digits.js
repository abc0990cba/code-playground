// 4 kyu
// Next bigger number with the same digits
// https://www.codewars.com/kata/55983863da40caa2c900004e


// Task description:
// Create a function that takes a positive integer and returns
// the next bigger number that can be formed by rearranging its digits.
// For example:
//     12 ==> 21
//     513 ==> 531
//     2017 ==> 2071

// nextBigger(num: 12)   // returns 21
// nextBigger(num: 513)  // returns 531
// nextBigger(num: 2017) // returns 2071

// If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift):
//    9 ==> -1
//    111 ==> -1
//    531 ==> -1
// nextBigger(num: 9)   // returns nil
// nextBigger(num: 111) // returns nil
// nextBigger(num: 531) // returns nil


function nextBigger(num) {
  let digits = num.toString().split('');

  // Find the pivot, the point (from right) where i > i-1.
  let pivotIndex = -1;
  for (let i = digits.length - 1; i > 0; i--) {
    const rightDigit = Number(digits[i]);
    const leftDigit = Number(digits[i - 1]);
    if (rightDigit > leftDigit) {
      pivotIndex = i - 1;
      break;
    }
  }

  // If we are unable to find the pivot, skip.
  if (pivotIndex == -1) {
    return pivotIndex;
  }

  // Make array of dogits, that right side from pivot.
  let rightDigits = digits.splice(pivotIndex);

  // Extract pivot.
  const pivot = rightDigits.splice(0, 1)[0];

  // Find the smallest digit (in the right part) that is larger than the pivot.
  let smallest = null;
  let smallestIndex = -1;
  for (let i = 0; i < rightDigits.length; i++) {
    if (rightDigits[i] > pivot) {
      if (smallest == null || rightDigits[i] < smallest) {
        smallest = rightDigits[i];
        smallestIndex = i;
      }
    }
  }

  if (smallestIndex == -1) {
    return smallestIndex;
  }

  // Delete the smallest digit (in the right part) that is larger than the pivot
  // from right part.
  rightDigits.splice(smallestIndex, 1);

  rightDigits.push(pivot);
  rightDigits = rightDigits.sort();

  // Concat the left digits, new pivot(as 'smallest') and right digits.
  const resultStr = [...digits, smallest, ...rightDigits].join('');
  let result = Number(resultStr);
  if (result < num) {
    return -1;
  }

  return result;
}
