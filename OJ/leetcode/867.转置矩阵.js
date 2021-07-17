/*
 * @lc app=leetcode.cn id=867 lang=javascript
 *
 * [867] 转置矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const transposed = Array.from({length: matrix[0].length}, () => []);
  for (let i = 0; i < m; i ++) {
    for (let j = 0; j < n; j ++) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
};
// @lc code=end

