function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph = new Map();

    for(let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }

    for(const [crs, preq] of prerequisites) {
        graph.get(crs).push(preq);
    }

    const res = [];

    const visiting = new Set();
    const visited = new Set();

    const hasNoCycle = (i: number) => {
        if(visiting.has(i)) return false;
        if(visited.has(i)) return true;

        visiting.add(i);

        for(const j of graph.get(i)){
            if(!hasNoCycle(j)) return false;
        }

        visiting.delete(i);
        visited.add(i);
        res.push(i);
        return true;
    }

    for(let i = 0; i < numCourses; i++) {
        if(!hasNoCycle(i)) return [];
    }

    return res;
};
