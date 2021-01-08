/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x < 2) return x;
  let left = 0, right = x, mid = 0, res = -1;
  while (left <= right) {
    mid = (left + right) >> 1;
    mid * mid <= x ? (res = mid, left = mid + 1) : (right = mid - 1);
  }
  return res;
};
// @lc code=end

