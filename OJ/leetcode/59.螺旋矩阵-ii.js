/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    const matrix = (new Array(n)).fill(0).map(item => (new Array(n).fill(0)));
    let top = 0, left = 0, bottom = n - 1, right = n - 1;
    let count = 1;
    while (left <= right && top <= bottom) {
        for (let i = left; i <= right; i ++) {
            matrix[top][i] = count;
            count ++;
        }
        top ++;
        for (let i = top; i <= bottom; i ++) {
            matrix[i][right] = count;
            count ++;
        }
        right --;
        for (let i = right; i >= left; i --) {
            matrix[bottom][i] = count;
            count ++;
        }
        bottom --;
        for (let i = bottom; i >= top; i --) {
            matrix[i][left] = count;
            count ++;
        }
        left ++;
    }
    return matrix;
};
// @lc code=end

