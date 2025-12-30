func totalNQueens(n int) int {
    res := 0
    const (
        QUEEN = 'Q'
        EMPTY = '.'
    )

    board := make([][]byte, n)
    for row := range(n) {
        board[row] = make([]byte, n)
        for col := range(n) {
            board[row][col] = EMPTY
        }
    }

    colSet := make(map[int]bool)
    mainDiag := make(map[int]bool) // \ - row-col=const
    secDiag := make(map[int]bool) // / - row+col=const

    var backtrack func(int)
    backtrack = func(row int) {
        if row == n {
            res++
            return
        }

        for col := range(n) {
            if colSet[col] || mainDiag[row-col] || secDiag[row+col] {
                continue
            }

            colSet[col] = true
            mainDiag[row-col] = true
            secDiag[row+col] = true
            board[row][col] = QUEEN

            backtrack(row+1)

            delete(colSet, col)
            delete(mainDiag, row-col)
            delete(secDiag, row+col)
            board[row][col] = EMPTY
        }
    }

    backtrack(0)

    return res
}
