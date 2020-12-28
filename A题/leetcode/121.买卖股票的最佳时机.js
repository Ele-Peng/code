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
// var maxProfit = function(prices) {
//     let len = prices.length;
//     let dp_i_0 = 0, dp_i_1 = -Infinity;
//     for (let i = 0; i < len; i ++) {
//         dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]); // 要么昨天就没持有，要么昨天持有了但卖掉了
//         dp_i_1 = Math.max(dp_i_1, -prices[i]);
//     }
//     return dp_i_0;
// };


var maxProfit = function(prices) {
    let n = prices.length;
    if (!n) return 0;
    let dp = new Array(n);
    let k = 1;
    for (let i = 0; i < n; i ++) {
        dp[i] = new Array(k);
        for (let j = 0;j <= k; j ++) {
            dp[i][j] = (new Array(2)).fill(0);
        }
    }
    for (let i = 0; i < n; i ++) {
        if (i - 1 === -1) { // base case
            dp[i][1][0] = 0;
            dp[i][1][1] = -prices[i];
            continue;
        }
        dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1] + prices[i]);
        dp[i][1][1] = Math.max(dp[i - 1][1][1], dp[i - 1][0][0] - prices[i]);
    }
    return dp[n - 1][1][0];
};
// @lc code=end

