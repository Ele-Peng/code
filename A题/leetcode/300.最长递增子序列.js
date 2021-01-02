/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  // dp[i] 严格以 第 i 个数 为结尾的上升子序列的长度
  let dp = (new Array(nums.length)).fill(1);
  for (let i = 0; i < nums.length; i ++) {
    for (let j = 0; j < i; j ++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  let res = Math.max(...dp);
  return res;
};
// @lc code=end

