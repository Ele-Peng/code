/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

const { lemonchiffon } = require("color-name");

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  let n = prices.length;
  if (k > n / 2) {
    return maxProfixKInfinity(prices);
  }
  // init dp table
  let dp = new Array(n);
  for (let i = 0; i < n; i ++) {
    dp[i] = new Array(k + 1);
    for (let j = 0; j <= k; j ++) {
      dp[i][j] = (new Array(2)).fill(0);
    }
  }

  for (let i = 0; i < n; i ++) {
    for (let j = k; j >= 1; j --) {
      if (i - 1 === -1) { // base case
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
        continue ;
      }
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  return dp[n - 1][k][0];
};

var maxProfixKInfinity = function (prices) {
  let n = prices.length;
  let dp_i_0 = 0;
  let dp_i_1 = -Infinity;
  for (let i = 0; i < n; i ++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
  }
  return dp_i_0;
}
// @lc code=end

