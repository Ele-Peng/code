/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var rob = function(nums) {
//   let len = nums.length;
//   if (len === 1) return nums[0];
//   return Math.max(dp(nums, 0, len - 2), dp(nums, 1, len - 1));
// };

// var dp = function (nums, start, end) {
//   let dp_i_1 = 0, dp_i_2 = 0;
//   let dp_i = 0;
//   for (let i = end; i >= start; i --) {
//     dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
//     dp_i_2 = dp_i_1;
//     dp_i_1 = dp_i;
//   }
//   return dp_i;
// }

var rob = function(nums) {
  let n = nums.length;
  if (n === 1) return nums[0];
  return Math.max(dp(nums, 0, n - 2), dp(nums, 1, n - 1));
}

function dp(nums, start, end) {
  let dp_i = 0, dp_i_1 = 0, dp_i_2 = 0;
  for (let i = end; i >= start; i --) {
    dp_i = Math.max(nums[i] + dp_i_2, dp_i_1);
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i;
  }
  return dp_i;
}
// @lc code=end

