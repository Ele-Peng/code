/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
  let res = 0;
  let target = S;
  var dfs = (nums, target, length, sum) => {
    if (length === nums.length) {
      if (sum === target) {
        res ++;
      }
      return ;
    }
  
    sum += nums[length]; // 选中 + 号
    dfs(nums, target, length + 1, sum);
    sum -= nums[length]; // 撤销选择
  
    sum -= nums[length]; // 选中 - 号
    dfs(nums, target, length + 1, sum);
    sum += nums[length]; // 撤销选择
  }
  dfs(nums, target, 0, 0);
  return res;
};
// @lc code=end

