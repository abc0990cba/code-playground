function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
    const topoSort = (conds: number[][]): number[] => {
        const graph = new Map<number, Set<number>>();
        const indegree = new Array(k+1).fill(0);

        for(let i = 1; i <= k; i++) {
            graph.set(i, new Set());
        }   

        for(const [src, dst] of conds) {
         
            if(!graph.get(src).has(dst)){
                indegree[dst]++;
                graph.get(src).add(dst);
            }
        }

        const queue = [];
        for(let i = 1; i <= k; i++) {
            if(indegree[i] === 0) {
                queue.push(i);
            }
        }   

        const res = [];

        while(queue.length) {
            const node = queue.shift();
            res.push(node);

            for(const dst of graph.get(node)) {
                indegree[dst]--;
                if(indegree[dst] === 0) {
                    queue.push(dst);
                }
            }
        }

        return res.length === k ? res : [];
    }

    const sortedRows = topoSort(rowConditions);
    const sortedCols = topoSort(colConditions);

    if(!sortedRows.length || !sortedCols.length) return [];

    const rMap = {};
    sortedRows.forEach((v, i) => rMap[v] = i);

    const cMap = {};
    sortedCols.forEach((v, i) => cMap[v] = i);

    const matrix = Array.from({length: k}, () => new Array(k).fill(0));

    for(let i = 1; i <= k; i++){
        matrix[rMap[i]][cMap[i]] = i;
    }

    return matrix;
};
