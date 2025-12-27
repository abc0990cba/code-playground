function combine(n: number, k: number): number[][] {
    const res: number[][] = [];

    const backtrack = (start: number, combination: number[]) => {
        if(combination.length === k) {
            res.push([...combination])
        }

        for(let i = start; i < n; i++) {
            combination.push(i+1);
            backtrack(i+1, combination);
            combination.pop();
        }
    }

    backtrack(0, []);

    return res;
};
