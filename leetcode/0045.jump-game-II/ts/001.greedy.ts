function jump(nums: number[]): number {
    let res = 0;
    let l = 0;
    let r = 0;

    while(r < nums.length-1){
        let farthest = 0;
        for(let i = l; i < r+1; i++){
            farthest = Math.max(farthest, nums[i] + i);
        }
        l = r + 1;
        r = farthest;
        res++
    }

    return res;
};
