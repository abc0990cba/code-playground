function pacificAtlantic(heights: number[][]): number[][] {
    if (!heights.length || !heights[0].length) return [];

    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array.from({length: rows}, () => new Array(cols).fill(false));
    const atlantic = Array.from({length: rows}, () => new Array(cols).fill(false));

    const dfs = (r: number, c: number, ocean: boolean[][], prevHeight: number) => {
        if(r < 0 || r > rows-1 || c < 0 || c > cols-1
         || ocean[r][c] 
         || heights[r][c] < prevHeight) {
            return;
         }

         ocean[r][c] = true;

         dfs(r+1, c, ocean, heights[r][c]);
         dfs(r-1, c, ocean, heights[r][c]);
         dfs(r, c+1, ocean, heights[r][c]);
         dfs(r, c-1, ocean, heights[r][c]);
    }

    for(let i = 0; i < rows; i++) {
        dfs(i, 0, pacific, heights[i][0]);
        dfs(i, cols-1, atlantic, heights[i][cols-1]);
    }

    for(let i = 0; i < cols; i++) {
        dfs(0, i, pacific, heights[0][i]);
        dfs(rows-1, i, atlantic, heights[rows-1][i]);
    }

    const res = [];
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(atlantic[i][j] && pacific[i][j]) {
                res.push([i,j]);
            }
        }
    }

    return res;
};
