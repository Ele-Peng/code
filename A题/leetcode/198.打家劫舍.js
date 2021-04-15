/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var rob = function(nums) {
//   let len = nums.length;
//   let memo = new Array(len).fill(-1);
//   return dp(memo, nums, 0);
// };

// var dp = function(memo, nums, start) {
//   if (start >= nums.length) return 0;
//   if (memo[start] !== -1) return memo[start];
//   // 不抢，去下一家
//   // 抢，去下下一家
//   let res = Math.max(dp(memo, nums, start + 1), nums[start] + dp(memo, nums, start + 2));
//   memo[start] = res;
//   return res;
// }


// var rob = function(nums) {
//   let len = nums.length;
//   let dp = new Array(len + 2).fill(0);
//   for (let i = len - 1; i >= 0; i --) {
//     dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
//   }
//   return dp[0];
// };


// var rob = function(nums) {
//   let len = nums.length;
//   let dp_i_1 = 0, dp_i_2 = 0;
//   let dp_i = 0;
//   for (let i = len - 1; i >= 0; i --) {
//     dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
//     dp_i_2 = dp_i_1;
//     dp_i_1 = dp_i;
//   }
//   return dp_i;
// };




var rob = function(nums) {
  let money = (new Array(nums.length)).fill(-1);
  return dp(nums, 0, money);
};

function dp(nums, start, money) {
  if (start >= nums.length) return 0;
  if (money[start] !== -1) return money[start];
  res = Math.max(nums[start] + dp(nums, start + 2, money), dp(nums, start + 1, money));
  money[start] = res;
  return res;
}
// @lc code=end

