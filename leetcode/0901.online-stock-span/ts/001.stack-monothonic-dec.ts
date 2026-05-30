class StockSpanner {
    stack: Array<{ price: number; span: number }>;

    constructor() {
        this.stack = [];
    }

    next(price: number): number {
        let span = 1;

        while(
            this.stack.length &&
            this.stack.at(-1).price <= price
        ) {
            span += this.stack.at(-1).span;
            this.stack.pop(); 
        }

        this.stack.push({ price, span });

        return this.stack.at(-1).span;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
