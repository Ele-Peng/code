/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 常规动态规划 会 timeout
// var minDistance = function(word1, word2) {
//   function dp (i, j) {
//     if (i === -1) return j + 1;
//     if (j === -1) return i + 1;

//     if (word1[i] === word2[j]) {
//       return dp(i - 1, j - 1);
//     } else {
//       return Math.min(
//         dp(i, j - 1), // 插入
//         dp(i - 1, j), // 删除
//         dp(i - 1, j - 1), // 替换
//       ) + 1;
//     }
//   }
//   return dp(word1.length - 1, word2.length - 1);
// };


// var minDistance = function(word1, word2) {
//   let len1 = word1.length;
//   let len2 = word2.length;
//   let dp = (new Array(len1 + 1));
//   for (let i = 0; i <= len1; i ++) {
//     dp[i] = (new Array(len2 + 1));
//     dp[i][0] = i;
//   }
//   for (let j = 1; j <= len2; j ++) {
//     dp[0][j] = j;
//   }
//   for (let i = 1; i <= len1; i ++) {
//     for (let j = 1; j <= len2; j ++) {
//       if (word1[i - 1] === word2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1];
//       } else {
//         dp[i][j] = Math.min(
//           dp[i][j - 1],
//           dp[i - 1][j],
//           dp[i - 1][j - 1]
//         ) + 1;
//       }
//     }
//   }
//   return dp[len1][len2];
// };

// dp 第二遍
var minDistance = function(word1, word2) {
  let len1 = word1.length; // 被转换 字符串
  let len2 = word2.length; // 目标 字符串

  // 初始化 dp table
  let dp = (new Array(len1 + 1));
  for (let i = 0; i <= len1; i ++) {
    dp[i] = new Array(len2 + 1);
    dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j ++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= len1; i ++) {
    for (let j = 1; j <= len2; j ++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i][j - 1],
          dp[i - 1][j],
          dp[i - 1][j - 1]
        ) + 1;
      }
    }
  }

  return dp[len1][len2];
}
// @lc code=end

