function maxProfit(prices: number[]): number {
    if(!prices.length) return 0;

    let noStock = 0;
    let holdingStock = -prices[0];
    let cooldown = -Infinity;

    for(let i = 1; i < prices.length; i++) {
        const prevNoStock = noStock;
        const prevHoldingStock = holdingStock;
        const prevCooldown = cooldown;

        noStock = Math.max(prevNoStock, prevCooldown);
        holdingStock = Math.max(prevHoldingStock, prevNoStock - prices[i]);
        cooldown = prevHoldingStock + prices[i];
    }

    return Math.max(noStock, cooldown);
};
