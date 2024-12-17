/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const dailyTemperatures = function(temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];

  for(const [idx, temp] of temperatures.entries()) {
    while (stack.length && temp > stack.at(-1).temp) {
      const { idx: stackIdx } = stack.pop();
      res[stackIdx] = idx - stackIdx;
    }
    stack.push({ temp, idx });
  }

  return res;
};

// Time: O(n)
// Space: O(n)