function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;

    const rank = new Array(n).fill(1);
    const parent = Array.from({ length: n }, (_, i) => i);;

    let res = n;

    const findRoot = (node) => {
        let cur = node;

        while(cur !== parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }

        return cur;
    }

    const union = (a, b) => {
        const rootA = findRoot(a);
        const rootB = findRoot(b);

        if(rootA === rootB) {
            return false;
        }

        if(rank[rootA] <= rank[rootB]) {
            parent[rootA] = rootB;
            rank[rootB] += rank[rootA];
        } else {
            parent[rootB] = rootA;
            rank[rootA] += rank[rootB];
        }

        return true;
    }


      for(let i = 0; i < n; i++) {
        // Start from i+1 because matrix is symmetric and we don't need diagonal
        for(let j = i + 1; j < n; j++) {
            if(isConnected[i][j] === 1) {
                if(union(i, j)) {
                    res--; 
                }
            }
        }
    }

    return res;
};
