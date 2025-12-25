func combinationSum2(candidates []int, target int) [][]int {
    res := [][]int{}

    sort.Ints(candidates)

    var backtrack func(int, []int, int)
    backtrack = func(i int, subset []int, sum int) {
        if sum == target {
            tmp := make([]int, len(subset))
            copy(tmp, subset)
            res = append(res, tmp)
            return
        }

        if i == len(candidates) || sum > target {
            return
        }

        subset = append(subset, candidates[i])
        backtrack(i+1, subset, sum + candidates[i])

        subset = subset[:len(subset)-1]

        for i+1 < len(candidates) && candidates[i] == candidates[i+1] {
            i++
        }

        backtrack(i+1, subset, sum)

    }

    backtrack(0, []int{}, 0)

    return res
}
