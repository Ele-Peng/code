/*
 * @lc app=leetcode.cn id=516 lang=javascript
 *
 * [516] 最长回文子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

var longestPalindromeSubseq = function(s) {
  let len = s.length;

  // 初始化 dp table
  let dp = new Array(len)
  for (let i = 0; i < len; i ++) {
    dp[i] = new Array(len);
    for (let j = 0; j <= i; j ++) {
      if (i === j) {
        dp[i][j] = 1;
        continue;
      }
      dp[i][j] = 0; // i < j 的默认为 0
    }
  }

  for (let i = len - 1; i >= 0; i --) {
    for (let j = i + 1; j < len; j ++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][len - 1];
};
// @lc code=end

