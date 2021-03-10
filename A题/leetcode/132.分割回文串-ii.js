/*
 * @lc app=leetcode.cn id=132 lang=javascript
 *
 * [132] 分割回文串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
    const n = s.length;
    const isPali = new Array(n);
    for (let i = 0; i < n; i ++) {
        isPali[i] = new Array(n);
    }

    //  从 row 到 col 的子串是否回文
    for (let col = 0; col < n; col ++) {
        for (let row = 0; row <= col; row ++) {
            if (row === col) {
                isPali[row][col] = true;
            } else if (col - row === 1 && s[row] === s[col]) {
                isPali[row][col] = true;
            } else if (col - row > 1 && s[row] === s[col] && isPali[row + 1][col - 1]) {
                isPali[row][col] = true;
            } else {
                isPali[row][col] = false;
            }
        }
    }

    const dp = new Array(n);
    for (let i = 0; i < n; i ++) {
        dp[i] = i;
    }
    for (let i = 0; i < n; i ++) {
        // 切一刀的前段
        if (isPali[0][i]) {
            dp[i] = 0;
            continue;
        }
        // 切一刀的后段
        for (let j = 0; j < i; j ++) {
            if (isPali[j + 1][i])
                dp[i] = Math.min(dp[i], dp[j] + 1);
        }
    }
    return dp[n - 1];
};
// @lc code=end

