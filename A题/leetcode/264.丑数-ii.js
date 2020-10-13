/*
 * @lc app=leetcode.cn id=264 lang=javascript
 *
 * [264] 丑数 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  let dp = [1];
  let a = 0, b = 0, c = 0;
  for (let i = 1; i < n; i ++) {
    let tempA = dp[a] * 2;
    let tempB = dp[b] * 3;
    let tempC = dp[c] * 5;
    let min = Math.min(tempA, tempB, tempC);
    dp[i] = min;
    if (min === tempA) a ++;
    if (min === tempB) b ++;
    if (min === tempC) c ++;
  }
  return dp[n - 1];
};
// @lc code=end

