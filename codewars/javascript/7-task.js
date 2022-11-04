// Task description 5kuy
// Write an algorithm that takes an array
// and moves all of the zeros to the end,
// preserving the order of the other elements.

// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

// Solution 1.
function moveZeros1(arr) {
    for (let i = arr.length; i >= 0; i--) {
        if (arr[i] === 0) {
            arr.splice(i, 1);
            arr.push(0);
        }
    }
    return arr;
}

// Solution 2.
function moveZeros2(arr) {
    const arrWithoutZero = arr.filter(x => x !== 0);
    const arrOnlyWithZeros = arr.filter(x => x === 0);

    return arrWithoutZero.concat(arrOnlyWithZeros);
  }

