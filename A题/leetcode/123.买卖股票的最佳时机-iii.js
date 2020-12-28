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
// var maxProfit = function(prices) {
//     let len = prices.length;
//     let dp_i_0 = 0, dp_i_1 = -Infinity, dp_pre_0 = 0, dp_pre_1 = -Infinity;
//     for (let i = 0; i < len; i ++) {
//         dp_pre_0 = Math.max(dp_pre_0, dp_pre_1 + prices[i]);
//         dp_pre_1 = Math.max(dp_pre_1, -prices[i]);
//         dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
//         dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
//     }
//     return dp_i_0;
// };

var maxProfit = function(prices) {
    let len = prices.length;
    let dp = new Array(len);
    let k = 2;
    for (let i = 0; i < len; i ++) {
        dp[i] = new Array(k + 1);
        for (let j = 0; j <= k; j ++) {
            dp[i][j] = (new Array(2)).fill(0);
        }
    }

    for (let i = 0; i < len; i ++) {
        for (let j = k; j >= 1;j --) {
            if (i - 1 === -1) {
                dp[i][j][0] = 0;
                dp[i][j][1] = -prices[i];
                continue;
            }
            dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
            dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
        }
    }

    return dp[len - 1][k][0];
};

// [2,1,2,0,1]
// @lc code=end

