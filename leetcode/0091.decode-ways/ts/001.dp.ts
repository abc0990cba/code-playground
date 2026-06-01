function numDecodings(s: string): number {
    const n = s.length;
    if(!n || s[0] === '') return 0;

    const dp = Array(n+1).fill(0);
    dp[0] = 1;

    for(let i = 1; i <= n; i++) {
        if(s[i-1] !== '0') {
            dp[i] += dp[i-1];
        }

        if(i >=2) {
            const twoDigitsNum = parseInt(s[i-2] + s[i-1], 10);
            if(twoDigitsNum >= 10 && twoDigitsNum <= 26) {
                dp[i] += dp[i-2];
            }
        }
    }

    return dp[n];
};
