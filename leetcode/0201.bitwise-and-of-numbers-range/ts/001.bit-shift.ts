function rangeBitwiseAnd(left: number, right: number): number {
    let shift = 0;

    while(left < right) {
        left = left >> 1;
        right = right >> 1;
        shift++;
    }

    return left << shift;
};
