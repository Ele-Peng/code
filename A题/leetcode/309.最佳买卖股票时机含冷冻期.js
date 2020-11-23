/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let len = prices.length;
  let dp_i_0 = 0, dp_i_1 = -Infinity;
  let dp_pre_0 = 0; // 代表 dp[i - 2][0]
  for (let i = 0; i < len; i ++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
    dp_pre_0 = temp;
  }
  return dp_i_0;
};
// @lc code=end

