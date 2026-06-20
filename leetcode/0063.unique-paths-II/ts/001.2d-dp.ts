function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const n = obstacleGrid.length;
    const m = obstacleGrid[0].length;

    if (obstacleGrid[0][0] === 1 || obstacleGrid[n - 1][m - 1] === 1) {
        return 0;
    }

    const dp = Array.from({ length: n }, () => new Array(m).fill(0));

    dp[0][0] = 1;

    for(let i = 0; i < n; i++) {
        if(obstacleGrid[i][0] === 1) {
            break;
        }
        dp[i][0] = 1;
    }

    for(let i = 0; i < m; i++) {
        if(obstacleGrid[0][i] === 1) {
            break;
        }
        dp[0][i] = 1;
    }

    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            if(obstacleGrid[i][j] === 1) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
    }

    return dp[n-1][m-1];
};
