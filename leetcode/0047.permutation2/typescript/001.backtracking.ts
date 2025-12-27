function permuteUnique(nums: number[]): number[][] {
    nums.sort()
    const res: number[][] = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = (path: number[]) => {
        if(path.length === nums.length) {
            res.push([...path]);
            return
        }

        let lastRemoved = -1000000;
        for(let i = 0; i < nums.length; i++) {
            if(used[i] || nums[i] === lastRemoved) {
                continue
            }

            used[i] = true;
            path.push(nums[i]);
            backtrack(path);

            used[i] = false;
            lastRemoved = path.pop();
        }
    }

    backtrack([]);

    return res;
};
