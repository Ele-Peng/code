/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// LIS dp 
var lengthOfLIS = function(nums) {
  let len = nums.length;
  let dp = (new Array(len)).fill(1);

  for (let i = 0; i < len; i ++) {
    for (let j = 0; j < i; j ++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  let res = Math.max(0, ...dp);
  return res;
};
// O(NlogN) 优化 
// var lengthOfLIS = function(nums) {
//   let top = new Array(nums.length);
//   let piles = 0; // 牌堆数初始化为0
//   for (let i = 0; i < nums.length; i ++) {
//     // 要处理的扑克牌
//     let poker = nums[i];

//     /** 二分查找放置位置 **/
//     let left = 0, right = piles;
//     while(left < right) {
//       let mid = Math.floor((left + right) / 2);
//       if (top[mid] < poker) {
//         left = mid + 1;
//       } else {
//         right = mid;
//       }
//     }

//     if (left === piles) piles++;
//     top[left] = poker;
//   }
//   return piles;
// };
// @lc code=end

