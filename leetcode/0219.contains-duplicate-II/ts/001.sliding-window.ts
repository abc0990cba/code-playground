// Time complexity: O(n)
// Space complexity: O(min(n,k))
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const dups = new Set();

    let l = 0;

    for (let r = 0; r < nums.length; r++) {
        if(r - l > k) {
            dups.delete(nums[l]);
            l++;
        }
        if(dups.has(nums[r])) return true;
        dups.add(nums[r]);
    }

    return false;
};
