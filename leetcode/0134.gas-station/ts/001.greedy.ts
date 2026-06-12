function canCompleteCircuit(gas: number[], cost: number[]): number {
    const sumGas = gas.reduce((acc, curr) => acc+curr, 0);
    const sumCost = cost.reduce((acc, curr) => acc+curr, 0);

    if(sumCost > sumGas) return -1;

    let res = 0;
    let total = 0;

    for(let i = 0; i < gas.length; i++) {
        total += gas[i] - cost[i];

        if(total < 0) {
            total = 0;
            res = i+1;
        }   
    }

    return res;
};
