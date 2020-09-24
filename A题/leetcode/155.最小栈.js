/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.data = [];
  this.min_data = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.data.push(x);
  this.min_data.push(this.min_data.length ? Math.min(x, this.min_data[this.min_data.length - 1]) : x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.data.pop();
  this.min_data.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.data[this.data.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.min_data[this.min_data.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end

