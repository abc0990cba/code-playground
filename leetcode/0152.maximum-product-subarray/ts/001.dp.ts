function maxProduct(nums: number[]): number {
    let globalMax = Math.max(...nums);
    let prevMax = nums[0];
    let prevMin = nums[0];

    for(let i = 1; i < nums.length; i++) {
        const num = nums[i]
        const currMax = Math.max(num, prevMax*num, prevMin*num);
        const currMin = Math.min(num, prevMax*num, prevMin*num);

        globalMax = Math.max(globalMax, currMax);

        prevMax = currMax;
        prevMin = currMin;
    }

    return globalMax;
};
