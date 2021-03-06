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
  if (!nums.length) return ;
  if (nums.length === 1) return nums[0];
  let prefixSum = [0];
  for (let i = 1; i <= nums.length; i ++) {
    prefixSum[i] = nums[i - 1] + prefixSum[i - 1];
  }
  let max = prefixSum[1];
  for (let i = 0; i <= nums.length; i ++) {
    for (let j = i + 1; j <= nums.length; j ++) {
      max = Math.max(max, prefixSum[j] - prefixSum[i]);
    }
  }
  return max;
};
// @lc code=end

