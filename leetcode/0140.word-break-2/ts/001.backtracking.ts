function wordBreak(s: string, wordDict: string[]): string[] {
    const res = [];
    const substrs = [];
    const wordSet = new Set(wordDict);

    const backtrack = (i) => {
        if(i === s.length) {
            res.push(substrs.join(' '));
            return
        }

        for(let j = i; j < s.length; j++) {
            const word = s.substring(i, j+1);
            if(wordSet.has(word)) {
                substrs.push(word);
                backtrack(j+1);
                substrs.pop();
            }
        }
    }

    backtrack(0);
    return res;
};
