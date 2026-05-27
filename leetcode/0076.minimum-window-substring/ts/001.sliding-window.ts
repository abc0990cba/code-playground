function minWindow(s: string, t: string): string {
    const countT = {};

    for(const char of t) {
        countT[char] = 1 + (countT[char] || 0); 
    }

    let have = 0;
    const need = Object.keys(countT).length;

    const window = {};
    let range = [-1, -1];
    let minLen = Infinity;

    let l = 0;
    for(let r = 0; r < s.length; r++){
        const char = s[r];

        window[char] = 1 + (window[char] || 0);

        if(countT[char] && countT[char] === window[char]) {
            have++;
        }

        while(have === need) {
            const len = r - l + 1;
            if(len < minLen) {
                minLen = len;
                range = [l, r];
            }

            const leftCh = s[l];
            window[leftCh]--;
            if(countT[leftCh] && window[leftCh] < countT[leftCh]) {
                have--;
            }
            l++;
        }
    }


    return minLen === Infinity ? "" : s.slice(range[0], range[1]+1);
};
