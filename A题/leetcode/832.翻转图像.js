/*
 * @lc app=leetcode.cn id=832 lang=javascript
 *
 * [832] 翻转图像
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  let res = [];
  // 水平翻转
  for (let i = 0; i < A.length; i ++) {
    res.push(A[i].map(item => item === 0 ? 1 : 0).reverse());
  }
  return res;
};
// @lc code=end

