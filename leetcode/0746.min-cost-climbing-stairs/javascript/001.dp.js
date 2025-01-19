/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    // for [10,15,20]
    // [10,15,20] 0
    //     -3,-2,-1 

    cost.push(0);

    for(let i = cost.length-3; i >= 0; i--) {
      cost[i] += Math.min(cost[i+1], cost[i+2]);
    }

    return Math.min(cost[0], cost[1])
};