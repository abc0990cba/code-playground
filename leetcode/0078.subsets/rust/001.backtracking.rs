impl Solution {
    pub fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut results = Vec::new();
        let mut subset = Vec::new();

        fn dfs(
          i: usize,
          nums: &[i32],
          subset: &mut Vec<i32>,
          results: &mut Vec<Vec<i32>>, 
        ) {
            if i >= nums.len() {
                results.push(subset.clone());
                return
            }

            subset.push(nums[i]);
            dfs(i+1, nums, subset, results);
            
            subset.pop();
            dfs(i+1, nums, subset, results);
        }


        dfs(0, &nums, &mut subset, &mut results);

        results
    }
}
