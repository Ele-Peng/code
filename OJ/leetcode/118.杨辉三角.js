/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    let res = [];
    for (let i = 0; i < numRows; i ++) {
        res[i] = new Array(i + 1).fill(1);
        for (let j = 0; j < i; j ++) {
            if (i - 1 >= 0 && j - 1 >= 0) {
                res[i][j] = res[i - 1][j] + res[i - 1][j - 1];
            }
        }
    }
    return res;
};
// @lc code=end

