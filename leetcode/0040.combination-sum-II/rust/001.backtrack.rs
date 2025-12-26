impl Solution {
    pub fn combination_sum2(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let mut candidates = candidates;
        candidates.sort_unstable();

        let mut res: Vec<Vec<i32>> = Vec::new();
        let mut subset: Vec<i32> = Vec:: new();

        fn backtrack(
            i: usize,
            target: i32,
            sum: i32,
            candidates: &[i32],
            subset: &mut Vec<i32>,
            res: &mut Vec<Vec<i32>>
        ) {
            if sum == target {
                res.push(subset.clone());
                return
            }
            if i >= candidates.len() || sum > target{
                return
            }

            subset.push(candidates[i]);
            backtrack(i+1, target, sum + candidates[i], candidates, subset, res);

            subset.pop();
            let mut nextI = i+1;
            while nextI < candidates.len() && candidates[i] == candidates[nextI] {
                nextI += 1;
            }
            backtrack(nextI, target, sum, candidates, subset, res);
        }

        backtrack(0, target, 0, &candidates, &mut subset, &mut res);

        res
    }
}
