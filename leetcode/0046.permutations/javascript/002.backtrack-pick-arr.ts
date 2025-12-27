function permute(nums: number[]): number[][] {
    const res = [];
    if(!nums.length) return res;

    const pick = new Array(nums.length).fill(false);

    const backtrack = (perms: number[]) => {
        if(perms.length === nums.length) {
            return res.push([...perms]);
        }

        for(let i = 0; i < nums.length; i++) {
            if(!pick[i]) {
                perms.push(nums[i]);
                pick[i] = true;
                backtrack(perms);
                pick[i] = false;
                perms.pop()
            }
        }
    }

    backtrack([])
    return res;
};
