const MinStack = function() {
  this.stack = [];
  this.min = Infinity;
};

/** 
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function(val) {
if(!this.stack.length) {
  this.stack.push(0);
  this.min = val;
} else {
  this.stack.push(val - this.min);
  if(val < this.min) this.min = val;
}
};

/**
* @return {void}
*/
MinStack.prototype.pop = function() {
const poped = this.stack.pop();

if(poped < 0) this.min -= poped;
};

/**
* @return {number}
*/
MinStack.prototype.top = function() {
const top = this.stack[this.stack.length-1];

return top > 0 ? top + this.min : this.min;
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function() {
return this.min;
};

/** 
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/

// Time for all ops: O(1)
// Space: O(n)