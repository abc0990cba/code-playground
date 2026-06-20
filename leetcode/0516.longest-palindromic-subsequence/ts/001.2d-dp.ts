function longestPalindromeSubseq(s: string): number {
    const lcs = (s1: string, s2: string) => {
        const n = s1.length;
        const m = s2.length;

        const dp  = Array.from({ length: n+1 }, () => new Array(m+1).fill(0));

        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= m; j++) {
                if(s1[i-1] === s2[j-1]) {
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
                }
            }
        }
        return dp[n][m];
    }

    return lcs(s, s.split('').reverse().join(''))
};
