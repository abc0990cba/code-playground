function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const prereqMap = new Map();

    for(let i = 0; i < numCourses; i++) {
        prereqMap.set(i, []);
    }

    for(const [crs, prereq] of prerequisites) {
        prereqMap.get(crs).push(prereq);
    }

    const visited = new Set();

    const dfs = (i: number) => {
        if(visited.has(i)) return false;

        if(prereqMap.get(i).length === 0) return true;

        visited.add(i);

        for(const j of prereqMap.get(i)) {
            const noCycle = dfs(j);
             if(!noCycle) return false;
        }

        visited.delete(i);
        prereqMap.set(i, []);

        return true;
    }

    for(let i = 0; i < numCourses; i++) {
       const noCycle = dfs(i);
       if(!noCycle) return false;
    }

    return true;
};
