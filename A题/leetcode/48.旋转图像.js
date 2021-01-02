/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// point(x, y) --> point(y, x) --> point(y, n - i + 1)
var rotate = function(matrix) {
  let n = matrix.length;
  // 对角线 矩阵
  for (let i = 0; i < n; i ++) {
    for (let j = 0; j < i; j ++) {
      let temp = matrix[j][i];
      matrix[j][i] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
  // 中心轴对称矩阵
  for (let i = 0; i < n; i ++) {
    for (let j = 0; j < (n >> 1); j ++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[i][n - j - 1];
      matrix[i][n - j - 1] = temp;
    }
  }
  return matrix;
};
// @lc code=end

