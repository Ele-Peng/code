/*
 * @lc app=leetcode.cn id=503 lang=javascript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  let ans = [];
  let stack = [];
  let n = nums.length;
  for (let i = 2 * n - 1; i >= 0; i --) {
    while (stack.length && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop();
    }
    ans[i % n] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums[i % n]);
  }
  return ans;
};
// @lc code=end

