function isValidSudoku(board: string[][]): boolean {
    const SIZE = 9;
    const rows = new Map();
    const cols = new Map();
    const subs = new Map();
    const SUBS_SIZE = 3;

    for(let i = 0; i < SIZE; i++) {
        for(let j = 0; j < SIZE; j++) {
            if(board[i][j] === '.') continue;

            const subsKey = `${Math.floor(i/SUBS_SIZE)}:${Math.floor(j/SUBS_SIZE)}`;

            if((rows.get(i) && rows.get(i).has(board[i][j]))
            || (cols.get(j) && cols.get(j).has(board[i][j]))
            || (subs.get(subsKey) && subs.get(subsKey).has(board[i][j])))
            {
                return false;
            }

            if(!rows.get(i)) rows.set(i, new Set());
            if(!cols.get(j)) cols.set(j, new Set());
            if(!subs.get(subsKey)) subs.set(subsKey, new Set());

            rows.get(i).add(board[i][j]);
            cols.get(j).add(board[i][j]);
            subs.get(subsKey).add(board[i][j]);
        }
    }

    return true;
};
