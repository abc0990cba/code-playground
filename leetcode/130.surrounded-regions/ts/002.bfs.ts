/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    const rows = board.length;
    const cols = board[0].length;
    
    (() => {
        const queue = [];
        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {
               if((r === 0
                || c === 0 
                || r === rows-1
                || c === cols-1)
                && board[r][c] === 'O'
                ) queue.push([r, c]);
            }
        }        

        const directions = [
            [1,0],
            [-1,0],
            [0, 1],
            [0, -1]
        ];

        while(queue.length) {
            const [r, c] = queue.shift();

            if(board[r][c] === "O") {
                board[r][c] = "T";

                for(const [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if(nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        queue.push([nr, nc]);
                    }
                }
            }
        }
    })();

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if(board[r][c] === "O") { 
                board[r][c] = "X";
            } else if(board[r][c] === "T") {
                board[r][c] = "O";
            }
        }
    }
};
