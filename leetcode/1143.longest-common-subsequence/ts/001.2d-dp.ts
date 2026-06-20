function longestCommonSubsequence(text1: string, text2: string): number {
    const n = text1.length;
    const m = text2.length;

    const dp = Array.from({ length: n+1 }, () => new Array(m+1).fill(0));

    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= m; j++){
            if(text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1; 
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
            }
        }
    }

    return dp[n][m];
};
