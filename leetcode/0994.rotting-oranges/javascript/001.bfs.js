/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const ROTTEN = 2;
    const FRESH = 1;

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let time = 0;
    let fresh = 0;

    const queue = [];

    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < COLS; j++) {
        if(grid[i][j] === FRESH) fresh++;
        if(grid[i][j] === ROTTEN) queue.push([i, j]);
      }
    }
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    while(queue.length && fresh > 0) {
      const lenQ = queue.length;

      for(let i = 0; i < lenQ; i++) {
        const [row, col] = queue.shift();

        for(const [dr, dc] of dirs) {
          const r = row + dr;
          const c = col + dc;
          if(r<0 || r >= ROWS || c<0 || c>= COLS
            || grid[r][c] != FRESH
          ) continue;

          grid[r][c] = ROTTEN;
          queue.push([r, c]);
          fresh--;
        }
      }
      time++
    }

    return fresh === 0 ? time : -1;
};