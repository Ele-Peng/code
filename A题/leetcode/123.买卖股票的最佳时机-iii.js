/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    let dp_i_0 = 0, dp_i_1 = -Infinity, dp_pre_0 = 0, dp_pre_1 = -Infinity;
    for (let i = 0; i < len; i ++) {
        dp_pre_0 = Math.max(dp_pre_0, dp_pre_1 + prices[i]);
        dp_pre_1 = Math.max(dp_pre_1, -prices[i]);
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
    }
    return dp_i_0;
};
// [2,1,2,0,1]
// @lc code=end

