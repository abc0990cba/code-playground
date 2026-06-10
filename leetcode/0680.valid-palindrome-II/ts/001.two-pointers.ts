function validPalindrome(s: string): boolean {
    const isPalindrome = (str: string) => {
        let [l, r] = [0, str.length-1];

        while(l < r) {
            if(str[l] !== str[r]){
                return false;
            } 
            
            l++;
            r--;
        }

        return true;
    }

    let [l, r] = [0, s.length-1];

    while(l < r) {
        if(s[l] !== s[r]){
            return (isPalindrome(s.slice(l+1, r+1)) || isPalindrome(s.slice(l, r)));
        } 
        
        l++;
        r--;
    }

    return true;
};
