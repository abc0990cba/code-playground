function calPoints(operations: string[]): number {
    let res = 0;
    const stack = [];

    for (const x of operations) {
        if(parseInt(x, 10)){
            const val = parseInt(x, 10)
            res += val;
            stack.push(val)
        } else if(x === '+') {
            const val = stack.at(-2) + stack.at(-1);
            res += val;
            stack.push(val);
        } else if(x === 'D'){
            const val = stack.at(-1) * 2;
            res += val;
            stack.push(val);
        } else {
            res -= stack.at(-1);
            stack.pop();
        }
    }

    return res;
};
