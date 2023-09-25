/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const hashmap = {};
    
    for(let i = 0; i < nums.length; i += 1) {
        const diff = target - nums[i];
        
        if(diff in hashmap) {
            return [hashmap[diff], i];
        }
        
        hashmap[nums[i]] = i;
    }

    return [];
};

// Time Complexity: O(n)
// Space Complexity: O(n)