/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
// 普通回溯
// var findTargetSumWays = function(nums, S) {
//   let res = 0;
//   let target = S;
//   // 基础类型 sum，不适合带入参数
//   var dfs = (nums, target, length, sum) => {
//     if (length === nums.length) {
//       if (sum === target) {
//         res ++;
//       }
//       return ;
//     }
  
//     sum += nums[length]; // 选中 + 号
//     dfs(nums, target, length + 1, sum);
//     sum -= nums[length]; // 撤销选择
  
//     sum -= nums[length]; // 选中 - 号
//     dfs(nums, target, length + 1, sum);
//     sum += nums[length]; // 撤销选择
//   }
//   dfs(nums, target, 0, 0);
//   return res;
// };

// 带备忘录回溯
// var findTargetSumWays = function(nums, S) {
//   let target = S;
//   if (nums.length === 0) return 0;
//   const memo = new Map;
//   let sum = 0;
//   let length = 0;
//   let res = dp(nums, target, length, sum, memo);
//   return res;
// }

// var dp = (nums, target, length, sum, memo) => {
//   if (length ===  nums.length) {
//     if (sum === target) {
//       return 1;
//     }
//     return 0;
//   }
//   let key = length + "," + sum;
//   if (memo.has(key)) {
//     return memo.get(key);
//   }
//   let result = dp(nums, target, length + 1, sum + nums[length], memo) + dp(nums, target, length + 1, sum - nums[length], memo);
//   memo.set(key, result);
//   return result;
// }

// 二维 动态规划
// var findTargetSumWays = function(nums, S) {
//   let target = S;
//   let sum = 0;
//   sum = nums.reduceRight((accumulator,item) => accumulator + item);
//   if (sum < target || (sum + target) % 2 === 1) {
//     return 0;
//   }
//   return subsets(nums, (sum + target) / 2);
// }


// var subsets = function(nums, sum) {
//   let n = nums.length;
//   // 创建二维数组
//   let dp = new Array(n + 1).fill(0);
//   for (let i = 0; i < dp.length; i ++) {
//     dp[i] = new Array(sum + 1).fill(0);
//     dp[i][0] = 1;
//   }

//   for (let i = 1; i <= n; i ++) {
//     for (j = 0; j <= sum; j ++) {
//       // dp[i][j] = x 表示，若只在前 i 个物品中选择，若当前背包的容量为 j，则最多有 x 种方法可以恰好装满背包。
//       if (j >= nums[i - 1]) { // 剩下的容量够把第i个东西放背包里
//         dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]]
//       } else { // 背包不够，不能把第i个放背包里
//         dp[i][j] = dp[i - 1][j];
//       }
//     }
//   }
//   return dp[n][sum];
// }

// 一维动态规划
var findTargetSumWays = function(nums, S) {
  let target = S;
  let sum = 0;
  sum = nums.reduceRight((accumulator,item) => accumulator + item);
  if (sum < target || (sum + target) % 2 === 1) {
    return 0;
  }
  return subsets(nums, (sum + target) / 2);
}

var subsets = (nums, sum) => {
  let n = nums.length;
  let dp = new Array(sum + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i ++) {
    for (let j = sum; j >= 0; j --) {
      if (j >= nums[i - 1]) {
        dp[j] = dp[j] + dp[j - nums[i - 1]];
      } else {
        dp[j] = dp[j];
      }
    }
  }
  return dp[sum];
}
// @lc code=end

