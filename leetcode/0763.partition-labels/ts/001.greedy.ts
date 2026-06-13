function partitionLabels(s: string): number[] {
    const lastIdx = new Map();

    for(let i = 0; i < s.length; i++) {
        lastIdx.set(s[i], i);
    }

    const res = [];
    let size = 0;
    let right = 0;
    for(let i = 0; i < s.length; i++) {
        right = Math.max(right, lastIdx.get(s[i]));
        size++;

        if(i === right) {
            res.push(size);
            size = 0;
        } 
    }

    return res;
};
