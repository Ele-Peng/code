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
var rotate = function(matrix) {
  let row = matrix.length;
  let tempMatrix = new Array(row);
  for (let i = 0; i < row; i ++) {
    tempMatrix[i] = (new Array(row)).fill(-1);
  }
  let rowIndex = 0, colIndex = 0;
  for (let j = 0; j < row; j ++) {
    for (let i = row - 1; i >= 0; i --) {
      tempMatrix[rowIndex][colIndex] = matrix[i][j];
      colIndex ++;
    }
    colIndex = 0;
    rowIndex ++;
  }
  for (let i = 0; i < row; i ++) {
    for (let j = 0; j < row; j ++) {
      matrix[i][j] = tempMatrix[i][j];
    }
  }
  return matrix;
};
// @lc code=end

