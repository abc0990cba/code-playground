function solveNQueens(n: number): string[][] {
    const EMPTY = '.';
    const QUEEN = 'Q';
    const board = Array(n).fill(EMPTY).map(row => Array(n).fill(EMPTY));
    const res = [];
    const colSet = new Set();
    const mainDiag = new Set(); // \ row - col = const 
    const secDiag = new Set(); // / row + col = const

    const backtrack = (row: number) => {
        if(row === n) {
            res.push(board.map(row => row.join('')));
            return
        }

        for(let col = 0; col < n; col++){
            if(colSet.has(col) || mainDiag.has(row-col) || secDiag.has(row+col)) {
                continue;
            }

            colSet.add(col);
            mainDiag.add(row-col);
            secDiag.add(row+col);
            board[row][col] = QUEEN;

            backtrack(row+1);

            colSet.delete(col);
            mainDiag.delete(row-col);
            secDiag.delete(row+col);
            board[row][col] = EMPTY;
        }
    }

    backtrack(0);

    return res;
};
