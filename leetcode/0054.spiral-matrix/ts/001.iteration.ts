function spiralOrder(matrix: number[][]): number[] {
    let top = 0;
    let bottom = matrix.length-1;
    let left = 0;
    let right = matrix[0].length-1;
    const res = [];

    while(top <= bottom && left <= right) {
        let i = left;
        while(i <= right) {
            res.push(matrix[top][i])
            i++;
        }
        top++;

        i = top;
        while(i <= bottom) {
            res.push(matrix[i][right])
            i++;
        }
        right--;

        if (left > right || top > bottom) {
            break;
        }

        i = right;
        while(i >= left) {
            res.push(matrix[bottom][i])
            i--;
        }
        bottom--;

        i = bottom;
        while(i >= top) {
            res.push(matrix[i][left])
            i--;
        }
        left++;
    }

    return res
};
