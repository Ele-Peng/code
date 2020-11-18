/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
// 把买卖股票拆分成小块，如果跌就不操作，涨就模拟单天买入卖出，一次循环解决
// var maxProfit = function(prices) {
//     let res = 0;
//     for (let i = 0; i < prices.length - 1; i ++) {
//         if (prices[i + 1] > prices[i]) {
//             res += prices[i + 1] - prices[i];
//         }
//     }
//     return res;
// };


var maxProfit = function(prices) {
    let len = prices.length;
    let dp_i_0 = 0, dp_i_1 = -Infinity;
    for (let i = 0; i < len; i ++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
};
// @lc code=end

