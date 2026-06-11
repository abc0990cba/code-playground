function mergeAlternately(word1: string, word2: string): string {
    let i1 = 0;
    let i2 = 0;
    const res = [];

    while(i1 < word1.length || i2 < word2.length) {
        if(i1 < word1.length) {
            res.push(word1[i1]);
            i1++;
        }
        if(i2 < word2.length) {
            res.push(word2[i2]);
            i2++;
        }
    }

    return res.join('');
};
