/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let n = nums.length;
  if (n === 0) return 0;
  let dp = new Array(n);
  dp[0] = nums[0];
  for (let i = 1; i < n; i ++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  let res = dp[0];
  for (let i = 1; i < n; i ++) {
    res = Math.max(res, dp[i]);
  }
  return res;
};
// @lc code=end

