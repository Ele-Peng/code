/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let ans = [];
  let stack = []; // 得用来记索引
  for (let i = T.length - 1; i >= 0; i --) {
    while (stack.length && T[stack[stack.length - 1]] <= T[i]) {
      stack.pop();
    }
    ans[i] = stack.length ? (stack[stack.length - 1] - i)  : 0;
    stack.push(i);
  }
  return ans;
};
// @lc code=end

