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
    let dp = new Array(len);
    for (let i = 0; i < len; i ++) {
        dp[i] = new Array(2);
    }
    for (let i = 0; i < len; i ++) {
        if (i - 1 === -1) {
            dp[i][0] = 0; // 第一天，不能持有股票为 0
            dp[i][1] = -prices[i]; // 第一天持有股票，置为 -Infinity 表示不可能
            continue;
        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]); // 要么昨天就没持有，要么昨天持有了但卖掉了
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    }
    return dp[len - 1][0];
};
// @lc code=end

