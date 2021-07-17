/*
 * @lc app=leetcode.cn id=738 lang=javascript
 *
 * [738] 单调递增的数字
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
  let arr = N.toString().split('');
  let i = arr.length;
  let start = arr.length;
  while(--i) {
    if (arr[i] < arr[i - 1]) {
      start = i - 1; // 当 当前数 < 前数，记录 前数的位置， 并减一
      arr[i - 1]--;
    }
  }
  while(++start < arr.length) arr[start] = 9;
  return arr.join('') | 0;
};
// @lc code=end

