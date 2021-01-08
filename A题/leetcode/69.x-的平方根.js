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
  let left = 1;
  let right = x >>> 1;
  while (left + 1 < right) {
    let mid = (left + right) >>> 1;
    if (mid * mid > x) {
      right = mid;
    } else if (mid * mid < x) {
      left = mid;
    } else {
      return mid;
    }
  }
  return right * right > x ? left : right;
};
// @lc code=end

