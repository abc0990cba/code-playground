// 6 kyu
// Regex Tic Tac Toe Win Checker
// https://www.codewars.com/kata/582e0450fe38013dbc0002d3

// Task description:
// Regex Tic Tac Toe Win Checker
// Earlier this year I was in a contest on HackerRank which included a code golf-style challenge
// to write a regular expression of 50 or fewer characters that could determine whether or not a tic tac
// toe (also known as noughts and crosses or Xs and Os) board had a winner.
// I'm not going to force you to keep your regex at or under 50 characters here,
// or even force you to use a regex if you really don't want to (though if you really don't want to write a regex,
// why don't you do one of the other tic tac toe katas here instead?),
// but why not challenge yourself, maybe learn something, and perhaps earn some Best Practices/Clever honor points for yourself as well?

// Your function will receive a string of nine "X", "O", and/or "-" characters representing the state of a tic tac toe board, for example the string
// "X-OXXXO-O" would represent the board
// X-O
// XXX
// O-O
// where player X has won by getting three in a row horizontally on the middle row.
// Your function needs to return true (depending on the language you're using) 
// if either the X or the O player has won the game by getting three in a row vertically, horizontally, or diagonally; or false if there is no winner.

// Solution 1
function regexTicTacToeWinChecker(board) {
    const newBoard = board.slice(0, 3) + ' ' + board.slice(3, 6) + ' ' + board.slice(6);

    const XReg = new RegExp(/XXX|X...X...X|X....X....X|X..X..X/);
    const OReg = new RegExp(/OOO|O...O...O|O....O....O|O..O..O/);

    if (XReg.test(newBoard) || OReg.test(newBoard)) {
        return true;
    }
    return false;

}

// Solution 2 
function regexTicTacToeWinChecker(board) {
  return /(\w)(..(\1|.\1.)..\1|.\1.\1..$|\1\1(...)*$)/.test(board)
}
