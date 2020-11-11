/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// [1,2,3,5]
// 二维 dp
// var canPartition = function(nums) {
//   let sum = nums.reduceRight((previous, current) => {
//     return previous + current;
//   });
//   if (sum % 2) return false;
//   // 初始化 dp table
//   let len = sum >> 1;
//   let dp = new Array(nums.length + 1);
//   for (let i = 0; i <= nums.length; i ++) {
//     dp[i] = new Array(len + 1);
//     dp[0].fill(false);
//     dp[i][0] = true;
//   }

//   for (let i = 1; i <= nums.length; i ++) {
//     for (let j = 1; j <= len; j ++) {
//       if (j - nums[i - 1] < 0) { // 背包已经装不下，维持不装的状态
//         dp[i][j] = dp[i - 1][j];
//       } else { // 选择装或者 不装
//         dp[i][j] = dp[i - 1][j - nums[i - 1]] || dp[i - 1][j];
//       }
//     }
//   }

//   // console.log(dp);

//   return dp[nums.length][len];
// };

// dp 优化
var canPartition = function(nums) {
  let sum = nums.reduceRight((accumulator, current) => {
    return accumulator + current;
  })
  if (sum % 2) return false;
  let mid = sum >> 1;

  let dp = (new Array(mid + 1)).fill(false);
  dp[0] = true;

  for (let i = 0; i < nums.length; i ++) {
    for (let j = mid; j >= 0; j --) {
      if (j - nums[i] >= 0) {
        dp[j] = dp[j] || dp[j - nums[i]];
      }
    }
  }
  return dp[mid];
}
// @lc code=end

