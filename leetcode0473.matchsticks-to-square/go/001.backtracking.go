func makesquare(sticks []int) bool {
    const SQUARE_SIDES_NUM = 4
    var sum int
    for _, stick := range(sticks) {
        sum += stick
    }

    if sum % SQUARE_SIDES_NUM != 0 {
        return false
    }
    sideSize := sum / SQUARE_SIDES_NUM
    sides := make([]int, SQUARE_SIDES_NUM)

    // Sort in descending order for better pruning
    sort.Sort(sort.Reverse(sort.IntSlice(sticks)))

    var backtrack func(int) bool
    backtrack = func(i int) bool {
        if i == len(sticks) {
            return true
        }

        for j := 0; j < SQUARE_SIDES_NUM; j++ {
            if sides[j] + sticks[i] <= sideSize {
                sides[j] += sticks[i]
                if backtrack(i+1) {
                    return true
                }
                sides[j] -= sticks[i]
            } 

            // Optimization: If this side is empty after backtracking,
            // skip other empty sides to avoid duplicate permutations
            if sides[j] == 0 {
                break
            }
        }

        return false
    }

    return backtrack(0)
}
