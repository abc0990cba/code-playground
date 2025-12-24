func combinationSum(candidates []int, target int) [][]int {
    res := [][]int{}

    var dfs func(int, []int, int)
    dfs = func(i int, cur []int, total int) {
        if total == target {
            tmp := make([]int, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }

        if i >= len(candidates) || total > target {
            return
        }

        cur = append(cur, candidates[i])
        dfs(i, cur, total + candidates[i])

        cur = cur[:len(cur)-1]
        dfs(i+1, cur, total)
    }

    dfs(0, []int{}, 0)

    return res
}
