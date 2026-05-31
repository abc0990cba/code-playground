class FreqStack {
    maxCnt: number;
    stacks: Record<number, Array<number>>;
    cnt: Record<number, number>;

    constructor() {
        this.maxCnt = 0;
        this.stacks = {};
        this.cnt = {};
    }

    push(val: number): void {
        const newCnt =  1 + (this.cnt[val] || 0);
        this.cnt[val] = newCnt;
        if(newCnt > this.maxCnt) {
            this.stacks[newCnt] = [];
            this.maxCnt = newCnt;
        }
        this.stacks[newCnt].push(val);
    }

    pop(): number {
        const res = this.stacks[this.maxCnt].pop();
        this.cnt[res] -= 1;
        if(!this.stacks[this.maxCnt].length) {
            this.maxCnt -= 1;
        }

        return res;
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
