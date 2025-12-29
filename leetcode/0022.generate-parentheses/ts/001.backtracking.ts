function generateParenthesis(n: number): string[] {
    const res = [];

    const backtrack = (str: string, closed: number, opened: number) => {
        if(closed === opened && str.length === 2*n) {
            res.push(str)
            return
        }

        if(opened < n) backtrack(str + '(', closed, opened + 1)
        if(closed < opened) backtrack(str + ')', closed + 1, opened)
    }

    backtrack('', 0, 0)

    return res;
};
