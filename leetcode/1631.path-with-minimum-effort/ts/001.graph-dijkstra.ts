function minimumEffortPath(heights: number[][]): number {
    const rows = heights.length;
    const cols = heights[0].length;

    const minHeap = new MinPriorityQueue<[number, number, number]>(x => x[0]);
    minHeap.enqueue([0,0,0]) // diff, r, c
    const visited = new Set();

    const directions = [[0,1], [0,-1], [1,0], [-1,0]];

    while(!minHeap.isEmpty()) {
        const [diff, r, c] = minHeap.dequeue()!;

        if(visited.has(`${r}:${c}`)) continue;
        visited.add(`${r}:${c}`);

        if(r === rows-1 && c === cols-1) return diff;

        for(const [dr, dc] of directions) {
            const nr = dr + r;
            const nc = dc + c;

            if(nr < 0 || nr === rows || nc < 0 || nc === cols) continue;

            const adjDiff = Math.abs(heights[r][c] - heights[nr][nc]);
            const newDiff = Math.max(diff, adjDiff);

            minHeap.enqueue([newDiff, nr, nc]);
        }
    }
};
