/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  // 初始化 dp table
  let dp = new Array(coins.length + 1);
  for (let i = 0; i <= coins.length; i ++) {
    dp[i] = (new Array(amount + 1)).fill(0);
    dp[i][0] = 1;
  }

  for (let i = 1; i <= coins.length; i ++) {
    for (let j = 1; j <= amount; j ++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[coins.length][amount];
};
// @lc code=end

