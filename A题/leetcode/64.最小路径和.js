/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

const { lemonchiffon } = require("color-name");

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let m = grid.length;
  let n = grid[0].length;
  if (!(m && n)) return 0;

  let dp = (new Array(m)).fill(0);
  for (let i = 0; i < m; i ++) {
    dp[i] = (new Array(n)).fill(0);
  }
  for (let row = 0; row < m; row ++) {
    for (let col = 0; col < n; col ++) {
      if (row !== 0 && col !== 0) {
        dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col];
      } else if (row === 0 && col !== 0) {
        dp[row][col] = dp[row][col - 1] + grid[row][col];
      } else if (row !== 0 && col === 0) {
        dp[row][col] = dp[row - 1][col] + grid[row][col];
      } else {
        dp[row][col] = grid[row][col];
      }
    }
  }

  return dp[m - 1][n - 1];
};
// @lc code=end

