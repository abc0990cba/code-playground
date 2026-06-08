function isAlienSorted(words: string[], order: string): boolean {
    const orderLetters = Array(26).fill(0);
    for(let i = 0; i < order.length; i++) {
        orderLetters[order.charCodeAt(i)-97] = i;
    }

    for(let i = 0; i < words.length-1; i++) {
        const word1 = words[i];
        const word2 = words[i+1];

        for(let j = 0; j < word1.length; j++) {
            if(j >= word2.length) return false;

            if(word1[j] !== word2[j]) {
                if(orderLetters[word1.charCodeAt(j)-97] > orderLetters[word2.charCodeAt(j)-97]) {
                    return false;
                } 
                break;
            }
        }
        return true;
    }
};
