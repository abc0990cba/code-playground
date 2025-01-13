/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const res = [];
    const colsSet = new Set();
    const posDiag = new Set(); // row + col = const
    const negDiag = new Set(); // row - col = const
    const board = Array.from({ length: n }, (row) => new Array(n).fill('.'));

    const backtrack = (i) => {
      if(i === n) {
        res.push(board.map(row => row.join('')))
        return;
      }

      for(let j = 0; j < n; j++) {
        if(colsSet.has(j) || posDiag.has(i+j) || negDiag.has(i-j)) {
          continue;
        }

        colsSet.add(j);
        posDiag.add(i+j);
        negDiag.add(i-j);
        board[i][j] = 'Q';

        backtrack(i+1);

        colsSet.delete(j);
        posDiag.delete(i+j);
        negDiag.delete(i-j);
        board[i][j] = '.';
      } 
    }

    backtrack(0);
    
    return res;
};