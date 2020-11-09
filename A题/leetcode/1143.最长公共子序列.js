/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 超时
// var longestCommonSubsequence = function(text1, text2) {
//   var dp = function(i, j) {
//     if (i === -1 || j === -1) return 0;
//     if (text1[i] === text2[j]) return dp(i - 1, j - 1) + 1;
//     return Math.max(dp(i - 1, j), dp(i , j - 1));
//   }
//   return dp(text1.length - 1, text2.length - 1);
// };

// dp table
var longestCommonSubsequence = function(text1, text2) {
  // 初始化 dp table
  // row --> text1
  // col --> text2
  let len1 = text1.length + 1;
  let len2 = text2.length + 1;
  let dp = new Array(len2);
  for (let i = 0; i <= len2; i ++) {
    dp[i] = new Array(len1 + 1);
    dp[0] = dp[0].fill(0);
    dp[i][0] = 0;
  }
  
  for (let i = 1; i <= len2; i ++) {
    for (let j = 1; j <= len1; j ++) {
      if (text2[i - 1] === text1[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[len2 - 1][len1 - 1];
};
// @lc code=end

