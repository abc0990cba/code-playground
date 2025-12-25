impl Solution {
    pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let mut results = Vec::new();
        let mut stack = Vec::new();

        fn backtrack(
            i: usize,
            candidates: &[i32],
            sum: i32,
            target: i32,
            results: &mut Vec<Vec<i32>>,
            stack: &mut Vec<i32>
        ) {

            if sum == target {
                results.push(stack.clone());
                return
            }         

            if sum > target || i >= candidates.len() {
                return
            }  

            stack.push(candidates[i]);
            backtrack(i, candidates, sum + candidates[i], target, results, stack);

            stack.pop();
            backtrack(i+1, candidates, sum, target, results, stack);

        }

        backtrack(0, &candidates, 0, target, &mut results, &mut stack);

        results
    }
}
