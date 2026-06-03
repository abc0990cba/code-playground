function isHappy(n: number): boolean {
    const hashMap = {};

    let res = n;

    while(res !== 1) {
        const digits = String(res).split('').map(Number);
        res = digits.reduce((acc, num) => acc + num ** 2, 0);
        if(hashMap[res]) break;
        hashMap[res] = true;
    }

    return res === 1;
};
