function findJudge(n: number, trust: number[][]): number {
    const delta = {}; // delta = incoming - outgoing edges
    // for judges:
    // incoming = n - 1
    // outgoing = 0

    for(const [src, dst] of trust) {
        delta[src] = (delta[src] || 0) - 1;
        delta[dst] = (delta[dst] || 0) + 1;
    }

    for(let i = 1; i <= n; i++) {
        if((delta[i] || 0) === n - 1) return i;
    }

    return -1;
};
