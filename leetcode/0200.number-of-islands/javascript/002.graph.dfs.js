/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const visited = new Set();
    if(!COLS) return 0;

    const directions =[[0, 1], [0, -1], [1, 0], [-1, 0]];
    let islandsNum = 0;

    const dfs = (r, c) => {
      if(r < 0 || r >= ROWS
        || c < 0 || c >= COLS 
        || grid[r][c] === '0') return;

      grid[r][c] = '0';
      visited.add(`${r}:${c}`);
      for(const [dr, dc] of directions) {
        dfs(r + dr, c + dc);
      }
    }

    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < COLS; j++) {
        if(grid[i][j] === '1' && !visited.has(`${i}:${j}`)) {
          dfs(i, j);
          islandsNum++;
        }
      }
    }

    return islandsNum;
};