function canReach(s: string, minJump: number, maxJump: number): boolean {
    const queue = [0];
    let farthest = 0;

    while(queue.length) {
        const i = queue.shift();
        const left = Math.max(i + minJump, farthest+1);
        const right = Math.min(s.length, i+maxJump+1);

        for(let j = left; j < right; j++) {
            if(s[j] === '0') {
                queue.push(j);
                if(j === s.length-1) return true;
            }   
       
        }

        farthest = i + maxJump;
    }

    return false;
};
