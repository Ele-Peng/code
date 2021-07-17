/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 左下角找起
var searchMatrix = function(matrix, target) {
  let i = matrix.length - 1, j = 0;
  while (i > -1 && j < matrix[0].length) {
    if (matrix[i][j] === target) return true;
    else matrix[i][j] > target ? i -- : j ++;
  }
  return false;
};
// @lc code=end

