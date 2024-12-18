/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const lastCol = cols - 1;

  // find row
  let top = 0;
  let btm = rows - 1;
  let row = -1;

  while(top <= btm) {
    const mid = Math.floor((top + btm) / 2);

    if(target < matrix[mid][0]) {
      btm = mid - 1;
    } else if(target > matrix[mid][lastCol]) {
      top = mid + 1;
    } else {
      row = mid;
      break;
    }
  }

  if(top > btm || row == -1) return false;
 
  // find column
  let l = 0;
  let r = lastCol;
  let col = -1;

  while(l <= r) {
    const mid = Math.floor((l + r) / 2);

    if(target < matrix[row][mid]) {
      r = mid - 1;
    } else if(target > matrix[row][mid]) {
      l = mid + 1;
    } else {
      col = mid;
      break;
    }
  }

  return col !== -1;
};