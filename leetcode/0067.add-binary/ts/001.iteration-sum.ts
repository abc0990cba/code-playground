function addBinary(a: string, b: string): string {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;

    const res = [];

    while( i >= 0 || j >= 0 || carry > 0) {
        const numI = i >= 0 ? Number(a[i]) : 0;
        const numJ = j >= 0 ? Number(b[j]) : 0;

        const sum = numI + numJ + carry;

        carry = Math.floor(sum / 2);

        res.push(sum % 2);

        i--;
        j--;
    } 

    return res.reverse().join('');
};
