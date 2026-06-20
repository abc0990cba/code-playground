function minDistance(word1: string, word2: string): number {
    const n = word1.length;
    const m = word2.length;

    // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    const dp = Array.from({ length: n+1 }, () => new Array(m+1).fill(0));

    // Base cases: converting to/from empty string
    for(let i = 0; i <= n; i++) {
        dp[i][0] = i;
    }

    for(let i = 0; i <= m; i++) {
        dp[0][i] = i;
    }

    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= m; j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j], //  delete
                    dp[i][j-1], //  insert
                    dp[i-1][j-1] // replace
                )
            }
        }
    }

    return dp[n][m];
};
