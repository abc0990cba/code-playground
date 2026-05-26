// Time complexity: O(n)
// Space complexity: O(1)

function minSubArrayLen(target: number, nums: number[]): number {
    if(!nums.length) return 0;

    let minLen = Infinity;
    let l = 0;
    let sum = 0;

    for(let r = 0; r < nums.length; r++) {
        sum += nums[r];

        while(sum >= target) {
            minLen = Math.min(r - l + 1, minLen);
            sum -= nums[l];
            l++;
        }
    }

    return minLen === Infinity ? 0 : minLen;  
};
