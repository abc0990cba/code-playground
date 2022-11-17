// 4 kyu
// 

// Task Description:
// Consider a sequence u where u is defined as follows:
// The number u(0) = 1 is the first one in u.
// For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
// There are no other numbers in u.
// Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
// 1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...
// Task:
// Given parameter n the function dbl_linear (or dblLinear...) returns the element u(n) of the ordered (with <) sequence u.
// Example:
// dbl_linear(10) should return 22
// Note:
// Focus attention on efficiency


// Solution 1
// https://stackoverflow.com/questions/49360883/dynamic-programming-code-wars-twice-linear-algorithm-times-out
// This problem can be solved in O(n). The idea is to keep track which element was generated last and add the smaller
// one of the two possibilities, so the elements are added in order.
function dblLinear(n) {
   let u = [1];
   let x = 0;
   let y = 0;
   for (let i = 0; i < n; i++) {
      let nextX = 2 * u[x] + 1;
      let nextY = 3 * u[y] + 1
      if (nextX <= nextY) {
         u.push(nextX);
         x++;
         if (nextX == nextY) {
           y++;
         }
       } else {
          u.push(nextY);
          y++;
       }
    }
    return u[n]
}


// Solution 2
function dblLinear2(n) {
  let x = 1;
  let y = [];
  let z = [];

  for (let i = 0; i < n; i++) {
     y.push(2 * x + 1);
     z.push(3 * x + 1);
     let min = Math.min(y[0], z[0]);
     if (min === y[0]) x = y.shift();
     if (min === z[0]) x = z.shift();
  }
  return x;
}
