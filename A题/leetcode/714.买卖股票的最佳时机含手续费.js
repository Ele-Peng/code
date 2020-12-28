/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// var maxProfit = function(prices, fee) {
//   let len = prices.length;
//   let dp_i_0 = 0, dp_i_1 = -Infinity;
//   for (let i = 0; i < len; i ++) {
//     dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i] - fee);
//     dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i]);
//   }
//   return dp_i_0;
// };

var maxProfit = function(prices, fee) {
  let len = prices.length;
  let dp = new Array(len);
  for (let i = 0; i < len; i ++) {
    dp[i] = (new Array(2)).fill(0);
  }

  for (let i = 0; i < len; i ++) {
    if (i - 1 === -1) {
      dp[i][0] = 0;
      dp[i][1] = -prices[i];
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[len - 1][0];
};
// @lc code=end

