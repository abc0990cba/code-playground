function merge(intervals: number[][]): number[][] {
    if(!intervals.length) return [];

    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];

    let [prevS, prevE] = intervals[0];

    for(let i = 1; i < intervals.length; i++) {
        const [s, e] = intervals[i]; 
        if(s > prevE) {
            merged.push([prevS, prevE]);
            prevS = s;
            prevE = e;
        } else {
            prevE = Math.max(prevE, e);
        }
    }
    merged.push([prevS, prevE]);

    return merged;
}
