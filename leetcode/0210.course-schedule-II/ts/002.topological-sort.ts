function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph = new Map<number, Set<number>>();
    const indegree = new Array(numCourses).fill(0);

    for(let i = 0; i < numCourses; i++) {
        graph.set(i, new Set());
    }

    for(const [crs, prereq] of prerequisites) {
        graph.get(crs).add(prereq);
        indegree[prereq]++;
    }

    const queue = [];

    for(let i = 0; i < numCourses; i++) {
        if(indegree[i] === 0) {
            queue.push(i);
        }
    }

    const res = [];

    while(queue.length) {
        const crs = queue.shift();
        res.push(crs);
    
        for(const prereq of graph.get(crs)) {
            indegree[prereq]--;
            if(indegree[prereq] === 0) {
                queue.push(prereq);
            }
        }
    }

    return res.length === numCourses ? res.reverse() : [];
};
