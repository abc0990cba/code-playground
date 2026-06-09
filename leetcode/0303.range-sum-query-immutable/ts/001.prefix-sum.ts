class NumArray {
    prefixSum: number[];

    constructor(nums: number[]) {
        this.prefixSum = [nums[0]];
        for(let i = 1; i < nums.length; i++) {
            this.prefixSum[i] = this.prefixSum[i-1] + nums[i]; 
        }
    }

    sumRange(left: number, right: number): number {
        return this.prefixSum[right] - (left === 0 ? 0 : this.prefixSum[left-1]);
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
