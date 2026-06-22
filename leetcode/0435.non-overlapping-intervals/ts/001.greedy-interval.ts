function eraseOverlapIntervals(intervals: number[][]): number {
    if(!intervals.length) return 0;

    intervals.sort((a, b) => a[0] - b[0]);

    let counter = 0;

    let [prevS, prevE] = intervals[0];

    for(let i = 1; i < intervals.length; i++) {
        const [s, e] = intervals[i]; 
        if(s >= prevE) {
            prevS = s;
            prevE = e;
        } else {
            prevE = Math.min(prevE, e);
            counter++;
        }
    }

    return counter;
};
