function tribonacci(n: number): number {
    const nums = [0,1,1];

    if(n<3) {
        return nums[n];
    }

    for(let i = 3; i <= n; i++) {
        nums[i % 3] = nums[0] + nums[1] + nums[2];
    }

    return nums[n%3];
};
