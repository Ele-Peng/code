/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let dp = new Array(n);
    for (let i = 0; i < n; i ++) {
        if (i === 0) {
            dp[i] = (new Array(m)).fill(1);
        } else {
            dp[i] = (new Array(m)).fill(0);
        }
        dp[i][0] = 1;
    }
    for (let i = 1; i < n; i ++) {
        for (let j = 1; j < m; j ++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[n - 1][m - 1];
};
// @lc code=end

