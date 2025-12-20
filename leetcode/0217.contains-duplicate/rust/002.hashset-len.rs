use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let hashset: HashSet<_> = nums.iter().collect();

        hashset.len() < nums.len()
    }
}
