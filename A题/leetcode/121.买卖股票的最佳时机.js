/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    let dp_i_0 = 0, dp_i_1 = -Infinity;
    for (let i = 0; i < len; i ++) {
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]); // 要么昨天就没持有，要么昨天持有了但卖掉了
        dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
};
// @lc code=end

