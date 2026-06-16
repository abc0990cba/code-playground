function numRescueBoats(people: number[], limit: number): number {
    people.sort((a,b) => a-b);
    let res = 0;
    let l = 0;
    let r = people.length-1;

    while(l <= r) {
        res++;
        const diff = limit - people[r];
        r--;

        if(l<=r && diff >= people[l]) {
            l++;
        }
    }

    return res;
};
