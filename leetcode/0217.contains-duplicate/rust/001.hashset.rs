use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let mut seen = HashSet::new();

        for &num in nums.iter() {
            if !seen.insert(num) {
                return true;
            }
        }

        false
    }
}
