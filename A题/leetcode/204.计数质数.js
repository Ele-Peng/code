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
  if (n <= 2) return 0;
  if (n === 3) return 1;
  let sum = 1;
  for (let i = 3; i < n; i ++) {
    sum = isPrimeNumber(i) ? sum + 1 : sum + 0;
  }
  return sum;
};
var isPrimeNumber = function(n) {
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i ++) {
    if (n % i === 0) return false;
  }
  return true;
};
// @lc code=end

