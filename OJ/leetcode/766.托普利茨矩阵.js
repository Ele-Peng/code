/*
 * @lc app=leetcode.cn id=766 lang=javascript
 *
 * [766] 托普利茨矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function(matrix) {
    let column = matrix.length;
    let row = matrix[0].length;

    for (let i = 0; i < column - 1; i ++) {
        for (let j = 0; j < row - 1; j ++) {
            if (matrix[i][j] === matrix[i + 1][j + 1]) continue;
            else return false;
        }
    }

    return true;
;};
// @lc code=end

