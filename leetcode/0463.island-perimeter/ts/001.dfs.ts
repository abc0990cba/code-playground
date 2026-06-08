function islandPerimeter(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const dfs = (i: number, j: number) => {
        if(j<0 || i<0 || j >= cols || i >= rows || grid[i][j] === 0) return 1;

        if(visited[i][j]) return 0;

        visited[i][j] = true;

        return dfs(i+1, j) + dfs(i-1, j) + dfs(i, j+1) + dfs(i, j-1);
    }

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++){
            if(grid[i][j] === 1) {
                return dfs(i, j);
            }
        }
    }

    return 0;
};
