/*
 * @lc app=leetcode.cn id=115 lang=javascript
 *
 * [115] 不同的子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    let sLen = s.length, tLen = t.length;
    let memo = (new Array(sLen)).fill(0).map((item) => (new Array(tLen)).fill(-1));
    return numDistinctHelper(sLen - 1, tLen - 1, s, t, memo);
};

var numDistinctHelper = function (i, j, s, t, memo) {
    if (j < 0) return 1;
    if (i < 0) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    if (s[i] === t[j]) {
        memo[i][j] = numDistinctHelper(i - 1, j, s, t, memo) + numDistinctHelper(i - 1, j - 1, s, t, memo);
    } else {
        memo[i][j] = numDistinctHelper(i - 1, j, s, t, memo);
    }
    return memo[i][j];
}
// @lc code=end

