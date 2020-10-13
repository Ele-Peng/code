/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 数学归纳法，最近重复子问题
// if else
// for while, recursion
// 1. n = 1; out: 1
// 2. n = 2 --> 1, 2; out: 2
// 3. n - 1, n - 2 --> f(1) + f(2)
// 4. n - 1, n - 2 --> f(2) + f(3)
// --> f(n) = f(n - 1) + f(n - 2)
// var climbStairs = function(n) {
//   let f1 = 1,
//     f2 = 2,
//     f3 = 3;
//   if (n === 1) return f1
//   if (n === 2) return f2
//   for (i = 1; i < n - 1; ++i) {
//     f3 = f1 + f2;
//     f1 = f2
//     f2 = f3
//   }
//   return f3
// };

// 递归 + 优化
var climbStairs = function(n) {
  let res = [0];
  climbStairsHelper(n, res);
  return res[n] + res[n - 1];
};

var climbStairsHelper = function(n, arr) {
  // recursion terminator
  if (n <= 1) return arr[n] = Math.max(0, n);
  // process current level
  if (arr[n]) return arr[n];
  // drill down
  arr[n] = climbStairsHelper(n - 1, arr) + climbStairsHelper(n - 2, arr);
  return arr[n];
}
// @lc code=end

