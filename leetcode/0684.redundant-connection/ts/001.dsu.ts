function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const parents = Array(n+1).fill(0).map((v, i) => i);
    const rank = Array(n+1).fill(0);

    const find = (i: number) => {
        if(parents[i] !== i) {
            parents[i] = find(parents[i]);
        }
        return parents[i];
    }

    const union = (n1: number, n2: number) => {
        const root1 = find(n1);
        const root2 = find(n2);

        if(root1 === root2) return false;

        if(rank[root1] > rank[root2]) {
            parents[root2] = root1; 
        } else if(rank[root1] < rank[root2]) {
            parents[root1] = root2; 
        } else {
            rank[root1]++;
            parents[root2] = root1; 
        }

        return true;
    }

    for(const [n1, n2] of edges) {
        if(!union(n1, n2)) {
            return [n1, n2];
        }
    }
};
