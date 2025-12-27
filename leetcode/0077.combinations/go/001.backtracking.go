func combine(n int, k int) [][]int {
    res := [][]int{}

    var backtrack func(int, []int)
    backtrack = func(start int, comb []int) {
        if len(comb) == k {
            tmp := make([]int, k)
            copy(tmp, comb)
            res = append(res, tmp)
        }

        for i := start; i < n; i++ {
            comb = append(comb, i+1)
            backtrack(i+1, comb)
            comb = comb[:len(comb)-1]
        }
    }

    backtrack(0, []int{})

    return res
}
