/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  let sum = 0;
  let arr = new Array(n);
  for (let i = 2; i < n; i ++) {
    if (!arr[i - 1]) {
      sum ++;
      for (let j = i * i; j <= n; j += i) {
        arr[j - 1] = true;
      }
    }
  }
  return sum;
};
// @lc code=end

