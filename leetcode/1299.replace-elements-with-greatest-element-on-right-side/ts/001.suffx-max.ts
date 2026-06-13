function replaceElements(arr: number[]): number[] {
    const n = arr.length;
    const res = new Array(n).fill(0);
    let max = -1;

    for(let i = n-1; i >= 0; i--){
        res[i] = max;
        max = Math.max(max, arr[i]);
    }

    return res;
};
