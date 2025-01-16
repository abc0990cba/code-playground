/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const visited = new Set();
  if(!COLS) return 0;

  const directions =[[0, 1], [0, -1], [1, 0], [-1, 0]];

  const dfs = (r, c) => {
    if(r < 0 || r >= ROWS
      || c < 0 || c >= COLS 
      || grid[r][c] === 0) return 0;

    grid[r][c] = 0;
    let area = 1;
    visited.add(`${r}:${c}`);
    for(const [dr, dc] of directions) {
      area += dfs(r + dr, c + dc);
    }
    return area;
  }

  let area = 0;
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      if(grid[i][j] === 1 && !visited.has(`${i}:${j}`)) {
        area = Math.max(area, dfs(i, j));
      }
    }
  }

  return area;
};