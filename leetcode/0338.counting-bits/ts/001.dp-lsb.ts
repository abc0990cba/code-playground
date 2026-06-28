function countBits(n: number): number[] {
    const dp = new Array(n+1).fill(0);

    for(let i = 1; i <= n; i++) {
        const leftPartIdx = i >> 1; // except LSB
        const rightPart = i & 1; // Least Significant Bit (LSB)

        dp[i] = dp[leftPartIdx] + rightPart;
    }

    return dp;
};
