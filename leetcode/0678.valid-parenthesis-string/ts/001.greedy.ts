function checkValidString(s: string): boolean {
    let leftMin = 0;
    let leftMax = 0;

    for(const ch of s){
        if(ch === '(') {
            leftMin++;
            leftMax++;
        } else if(ch === ')') {
            leftMin--;
            leftMax--;
        } else {
            leftMin--;
            leftMax++;
        }

        if(leftMax < 0) return false;

        leftMin = Math.max(0, leftMin);
    }

    return leftMin === 0;
};
