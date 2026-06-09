function subarraySum(nums: number[], k: number): number {
    let res = 0;
    // prefix sums
    const hashMap = new Map<number,number>();
    hashMap.set(0, 1);
    let sum = 0;

    for(const num of nums) {
        sum += num;
        const diff = sum - k;
        res += hashMap.get(diff) || 0;
        hashMap.set(sum, (hashMap.get(sum) || 0) + 1)
    }

    return res;
};
