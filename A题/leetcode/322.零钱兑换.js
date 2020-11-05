/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// var coinChange = function(coins, amount) {
//   let max = amount + 1;
//   let dp = new Array(amount + 1).fill(max)
//   dp[0] = 0
//   for (let i = 0; i <= amount; i ++) {
//     for (let j = 0; j < coins.length; j ++) {
//       if (coins[j] <= i) {
//         dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
//       }
//     }
//   }
//   return dp[amount] > amount ? -1 : dp[amount]
// };

// 迭代 + 备忘录
// var coinChange = function(coins, amount) {
//   let memo = new Array(amount + 1).fill(amount + 1);

//   const dp = (n) => {
//     // base case
//     if (n === 0) return 0;
//     if (n < 0) return -1;
//     if (memo[n] !== amount + 1) return memo[n];

//     let res = amount + 1;
//     for (let i = 0; i < coins.length; i ++) {
//       let coin = coins[i];
//       let subProblem = dp(n - coin);
//       if (subProblem === -1) continue;
//       res = Math.min(res, 1 + subProblem);
//     }

//     if (res === amount + 1) {
//       memo[n] = -1;
//       return -1;
//     } else {
//       memo[n] = res;
//       return res;
//     }
//   }
//   return dp(amount);
// }

// dp 表示目标金额为 i 元，至少需要 dp[i] 枚硬币可以凑出
var coinChange = function(coins, amount) {
  const dp = (new Array(amount + 1)).fill(amount + 1);
  dp[0] = 0;

  for (let i = 1; i < dp.length; i ++) {
    for (let j = 0; j < coins.length; j ++) {
      let coin = coins[j];
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}
// @lc code=end

