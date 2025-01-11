/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const ROWS = board.length;
  const COLS = board[0].length;
  const visited = new Set();
  
  const backtrack = (row, col, i) => {
    if(i === word.length) return true;

    const visitedElem = `${row}:${col}`;

    if(row >= ROWS || row < 0 
      || col >= COLS || col < 0
      || word[i] !== board[row][col] 
      || visited.has(visitedElem)
    ) return false;

    visited.add(visitedElem);

    const result =
       backtrack(row + 1, col, i + 1) ||
       backtrack(row, col + 1, i + 1) ||
       backtrack(row - 1, col, i + 1) ||
       backtrack(row, col - 1, i + 1);

    visited.delete(visitedElem);

    return result;
  }

  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      if(backtrack(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
};