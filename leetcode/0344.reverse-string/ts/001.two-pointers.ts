/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
    let [start, end] = [0, s.length-1];

    while(start < end) {
        const tmp = s[start];
        s[start] = s[end];
        s[end] = tmp;
        start++;
        end--;
    }
};
