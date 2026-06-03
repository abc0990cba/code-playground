/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    let zeroRow = false;

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][j] === 0) {
                matrix[0][j] = 0;

                if(i > 0) {
                    matrix[i][0] = 0;
                } else {
                    zeroRow = true;
                }
            }
        }
    }

    for(let i = 1; i < matrix.length; i++) {
        for(let j = 1; j < matrix[0].length; j++) {
            if(matrix[0][j] === 0 || matrix[i][0] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if(matrix[0][0] === 0) {
        for(let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }

    if(zeroRow) {
        for(let j = 0; j < matrix[0].length; j++) {
            matrix[0][j] = 0;
        }
    }
};
