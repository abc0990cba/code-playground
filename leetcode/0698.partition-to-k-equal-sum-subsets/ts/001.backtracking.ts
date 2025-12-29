function canPartitionKSubsets(nums: number[], k: number): boolean {
   const sum = nums.reduce((a,b) => a + b, 0);
   nums.sort((a,b) => b - a);

   const used = Array(k).fill(false);

   if(sum % k !== 0) return false

   const target = sum  / k;

   const backtrack = (i: number, k: number, subsetSum: number) => {
        if(k === 0) {
            return true;
        }
        if(subsetSum === target) {
            return backtrack(0, k-1, 0);
        }
       
        for (let j = i; j < nums.length; j++) {
            if(used[j] || subsetSum + nums[j] > target) {
                continue;
            }     
            used[j] = true;
            if(backtrack(j+1, k, subsetSum + nums[j])) {
                return true
            }
            used[j] = false;
        }

        return false;
    }

   return backtrack(0, k, 0);
};
