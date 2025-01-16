/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  if(!COLS) return 0;

  const visited = new Set();
  const directions =[[0, 1], [0, -1], [1, 0], [-1, 0]];

  const bfs = (r, c) => {
    const pos = `${r}:${c}`
    const queue = [pos];
    visited.add(pos);
    let area = 1;

    while(queue.length) {
      const [row, col] = queue.shift().split(':').map(Number);

      for(const [dr, dc] of directions) {
        const rr = row + dr;
        const cc = col + dc;
        const pos = `${rr}:${cc}`; 

        if(rr >= 0 && rr < ROWS
           && cc >= 0 && cc < COLS 
           && grid[rr][cc] === 1 
           && !visited.has(pos)) {
          visited.add(pos);
          queue.push(pos);
          grid[rr][cc] = 0;
          area++;
        }
      }
    }

    return area;
  }

  let area = 0;
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      if(grid[i][j] === 1 && !visited.has(`${i}:${j}`)) {
        area = Math.max(area, bfs(i, j));
      }
    }
  }

  return area;
};