function mergeTriplets(triplets: number[][], target: number[]): boolean {
    const aSet = new Set();
    const bSet = new Set();
    const cSet = new Set();

    for(const triplet of triplets) {
        if(triplet[0] <= target[0] && triplet[1] <= target[1] && triplet[2] <= target[2]) {
            aSet.add(triplet[0]);
            bSet.add(triplet[1]);
            cSet.add(triplet[2]);
        }
    }

    return aSet.has(target[0]) && bSet.has(target[1]) && cSet.has(target[2]);
};
