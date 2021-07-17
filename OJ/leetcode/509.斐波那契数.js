/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
// 带备忘录的递归
// var fib = function(N) {
//   if (N < 1) return 0;
//   const memo = (new Array(N + 1)).fill(0);
//   return fibHelper(memo, N);
// };


// var fibHelper = function(memo, n) {
//     if (memo[n] !== 0) return memo[n];
//     if (n === 1 || n === 2) return 1;
//     memo[n] = fibHelper(memo, n - 1) + fibHelper(memo, n - 2);
//     return memo[n];
// };

// dp 数组的迭代解法 空间复杂度 O(N)
// var fib = function(N) {
//     let dp = (new Array(N + 1)).fill(0);
//     dp[1] = 1;
//     dp[2] = 1;
//     for (let i = 3; i <= N; i ++) {
//         dp[i] = dp[i - 1] + dp[i - 2];
//     }
//     return dp[N];
// };

// dp 数组的迭代解法 空间复杂度 O(1)
var fib = function(N) {
    if (N < 1) return 0;
    let prev = 1;
    let curr = 1;
    for (let i = 3; i <= N; i ++) {
        let sum = prev + curr;
        prev = curr;
        curr = sum;
    }
    return curr;
};
// @lc code=end

