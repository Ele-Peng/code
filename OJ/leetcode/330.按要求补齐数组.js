/*
 * @lc app=leetcode.cn id=330 lang=javascript
 *
 * [330] 按要求补齐数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var minPatches = function(nums, n) {
  let count = 0;
  let total = 0;
  let index = 0;

  while (total < n) {
    if (index < nums.length && total >= nums[index] - 1) {
      total = total + nums[index ++];
    } else {
      total = total + (total + 1);
      count ++;
    }
  }

  return count;
};
// @lc code=end

