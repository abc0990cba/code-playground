// 3 kyu
// Make a spiral
// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6

// Task description:
// Your task, is to create a NxN spiral with a given size.

// For example, spiral with size 5 should look like this:
// 00000
// ....0
// 000.0
// 0...0
// 00000

// and with the size 10:
// 0000000000
// .........0
// 00000000.0
// 0......0.0
// 0.0000.0.0
// 0.0..0.0.0
// 0.0....0.0
// 0.000000.0
// 0........0
// 0000000000

// Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s.
// For example for given size 5 result should be:

// [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Because of the edge-cases for tiny spirals, the size will be at least 5.
// General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.

// Solution 1.
const spiralize = (rows, cols = rows) => {
  return Array(rows)
    .fill(Array(cols).fill())
    .map((row, rowIndex) =>
      row.map((_, colIndex) => {
        return Number(
          // top
          (rowIndex < rows / 2 && rowIndex % 2 === 0 && rowIndex - 2 <= colIndex && colIndex <= cols - rowIndex - 1) ||
          // right
          (colIndex > (cols - 2) / 2 && (cols - colIndex) % 2 === 1 && cols - colIndex - 2 < rowIndex && rowIndex <= rows - (cols - colIndex)) ||
          // bottom
          (rowIndex > rows / 2 && (rows - rowIndex) % 2 === 1 && rows - rowIndex - 2 < colIndex && colIndex < cols - (rows - rowIndex)) ||
          // left
          (colIndex < (cols - 2) / 2 && colIndex % 2 === 0 && rowIndex > colIndex + 1 && rowIndex < rows - colIndex)
        );
      })
    );
};


// Solution 2.
// Based on solution from codewars user 'Olegeant'
// The idea is to build an array of "concentrical" '0' and '1' squares replacing
// to opposite just a few figures along the diagonal in the upper left quadrant. 
// Smth like:

//  1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1
//  1             1    *             1                  1
//  1   1 1 1 1   1    1 * 1 1 1 1   1    1 1 1 1 1 1   1
//  1   1     1   1 => 1   *     1   1 => 1         1   1
//  1   1     1   1 => 1   1     1   1 => 1   1     1   1
//  1   1 1 1 1   1    1   1 1 1 1   1    1   1 1 1 1   1
//  1             1    1             1    1             1
//  1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1    1 1 1 1 1 1 1 1



const spiralize = (size) => {
    
  const matrix = Array(size).fill(Array(size).fill());
  
  const changeCol = (rowIdx) => (col, colIdx) => {
      const shouldReverse = rowIdx <= size / 2 - 1 + Math.sign(size % 4)
                         && rowIdx - colIdx === 1;
      const rowIdxMirror = (rowIdx < size / 2) ? rowIdx : size - 1 - rowIdx;
      const colIdxMirror = (colIdx < size / 2) ? colIdx : size - 1 - colIdx;
      return (
        rowIdxMirror % 2 === 1 && rowIdxMirror <= colIdxMirror ||
        colIdxMirror % 2 === 1 && rowIdxMirror >= colIdxMirror
                              ? (0 - shouldReverse) ** 2
                              : 1 - shouldReverse
      );   
  }
  
  const makeSpiral = (row, rowIdx) => row.map(changeCol(rowIdx));
  
  return matrix.map(makeSpiral);
}
