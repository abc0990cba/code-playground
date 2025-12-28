func exist(board [][]byte, word string) bool {
    rows := len(board)
    if rows == 0 {
        return false
    }
    cols := len(board[0])

    var backtrack func(int, int, int) bool
    backtrack = func (row, col, i int) bool {
        if i == len(word) {
            return true
        }

        if col < 0 || col >= cols || row < 0 || row >= rows {
            return false
        }
 
        if word[i] != board[row][col] {
            return false
        }

        const USED = '#'
        initialLetter := board[row][col]
        board[row][col] = USED

        isFound := backtrack(row+1, col, i+1) ||
                   backtrack(row-1, col, i+1)|| 
                   backtrack(row, col+1, i+1) || 
                   backtrack(row, col-1, i+1)
        
        board[row][col] = initialLetter 

        return isFound
    }


    firstLetter := word[0]
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            if board[i][j] == firstLetter && backtrack(i, j, 0) {
                return true
            }
        }
    }

    return false
}
