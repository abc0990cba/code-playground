function makesquare(sticks: number[]): boolean {
    const SQUARE_SIDES_NUM = 4;
    const sum = sticks.reduce((a, b)=> a + b, 0);

    if(sum % SQUARE_SIDES_NUM !== 0) {
        return false
    }
    const sideSize = sum / SQUARE_SIDES_NUM;
    const sides = Array(SQUARE_SIDES_NUM).fill(0);

    const backtrack = (i) => {
        if(i === sticks.length) {
            return true
        }

        for(let j = 0; j < SQUARE_SIDES_NUM; j++) {
            if(sides[j] + sticks[i] <= sideSize) {
                sides[j] += sticks[i];
                if(backtrack(i+1)) {
                    return true
                }
                sides[j] -= sticks[i];
            }

            if (sides[j] === 0) break;
        }

        return false;
    }

    return backtrack(0);
};
