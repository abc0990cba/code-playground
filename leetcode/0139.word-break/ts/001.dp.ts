function wordBreak(s: string, wordDict: string[]): boolean {
    const set = new Set(wordDict);
    const n = s.length;
    const dp = Array(n+1).fill(false);
    dp[0] = true;

    for(let i = 1; i <= n; i++) {
        for(let j = 0; j <= i; j++) {
            if(dp[j] === true && set.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};
