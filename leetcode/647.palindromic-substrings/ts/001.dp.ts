function countSubstrings(s: string): number {
    const n = s.length;
    let res = 0;
    const dp = Array.from({length: n}, () => Array(n).fill(false));

    for(let i = n-1; i >= 0; i--) {
        for(let j = i; j < n; j++) {
            if((s[i] === s[j]) && ((j-i <=2) || dp[i+1][j-1] === true)) {
                dp[i][j] = true;
                res++;
            }
        }
    }

    return res;
};
