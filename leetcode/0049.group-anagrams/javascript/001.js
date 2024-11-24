const groupAnagrams = (strs) => {
    // mapping charCount to list of anagrams i.e "1e,1a,1t": ["eat", "tea", "ate"]
    let res = {}; 

    for(let str of strs) {
        // for a....z
        const count = new Array(26).fill(0); 

        // We'll index a to 0 till z to idx 25
        for(let char of str) {
            count[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
        }

        const commaSeparatedCount = count.join(",");
        if(commaSeparatedCount in res) {
            res[commaSeparatedCount].push(str)
        } else {
            res[commaSeparatedCount] = [str];
        }
    }

    return Object.values(res);
}

// solution with O(m * n) time and O(m) space,
// where m is the number of strings and n is the length of the longest string.
