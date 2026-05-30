function largestRectangleArea(heights: number[]): number {
    const stack: Array<{idx: number; height: number}> = [];
    let maxRect = heights[0];
    let startIdx = 0;
    const n = heights.length;

    for(let i = 0; i < n; i++) {
        startIdx = i;
        while(stack.length && stack.at(-1).height > heights[i]) {
            const { idx, height } = stack.pop();
            maxRect = Math.max(maxRect, height * (i - idx));
            startIdx = idx;
        }
        stack.push({idx: startIdx, height: heights[i]});
    }

    for(const { height, idx } of stack) {
        maxRect = Math.max(maxRect, height * (n - idx))
    }

    return maxRect;
};
