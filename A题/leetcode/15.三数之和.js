/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 暴力求解 O(n^3)
// 会超时 Time Limit Exceeded
// k + j + i = 0
// j + i = -k
// var threeSum = function(nums) {
//   let res = []
//   nums.sort((a, b) => { return a - b})
//   for (let k = 0; k < nums.length - 2; k ++) {
//     for (let j = k + 1; j < nums.length - 1; j ++) {
//       for (let i = j + 1; i < nums.length; i ++) {
//         if (nums[k] + nums[j] + nums[i] === 0) {
//           if (res.length === 0) {
//             res.push([nums[k], nums[j], nums[i]])
//           }
//           let isExitInRes = false
//           for (let resI = 0; resI < res.length; resI ++) {
//             if ((res[resI][0] === nums[k]) && (res[resI][1] === nums[j]) && (res[resI][2] === nums[i])) {
//               isExitInRes = true
//             }
//           }
//           if (!isExitInRes) {
//             res.push([nums[k], nums[j], nums[i]])
//           }
//         }
//       }
//     }
//   }
//   return res
// };


// hash 来记录


// 双指针 左右下标
// var threeSum = function(nums) {
//   let res = []
//   nums.sort((a, b) => { return a - b })
//   for (let target = 0;target < nums.length; target++) {
//     // 因为已经排序好，所以后面不可能有三个数加和等于 00，直接返回结果
//     if (nums[target] > 0) break;
//     if (target > 0 && nums[target] === nums[target - 1]) {
//       continue;
//     };
//     for (let i = target + 1, j = nums.length - 1; i < j; ) {
//       if (nums[target] + nums[i] + nums[j] < 0) {
//         i++
//         while (i < j && nums[i] === nums[i - 1]) i++
//       } else if (nums[target] + nums[i] + nums[j] > 0) {
//         j--
//         while (i < j && nums[j] === nums[j + 1]) j--
//       } else if (nums[target] + nums[i] + nums[j] === 0) {
//         res.push([nums[target], nums[i], nums[j]])
//         i++
//         j--
//         while (i < j && nums[i] === nums[i - 1]) i++
//         while (i < j && nums[j] === nums[j + 1]) j--
//       }
//     }
//   }
//   return res
// };



var threeSum = function(nums) {
  if (!nums || nums.length < 3) return [];
  let res = [];
  nums.sort((a, b) => {return a - b;});
  for (let target = 0; target < nums.length; target ++) {
    // 因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果
    if (nums[target] > 0) return res;
    // 重复target元素
    if (target > 0 && nums[target] === nums[target - 1]) continue;
    let i = target + 1, j = nums.length - 1;
    while (i < j) {
      if (nums[target] + nums[i] + nums[j] > 0) {
        j --;
        while (i < j && nums[j] === nums[j + 1]) j --;
      } else if (nums[target] + nums[i] + nums[j] < 0) {
        i ++;
        while (i < j && nums[i] === nums[i - 1]) i ++;
      } else if (nums[target] + nums[i] + nums[j] === 0) {
        res.push([nums[target], nums[i], nums[j]]);
        i ++;
        j --;
        while(i < j && nums[j] === nums[j + 1]) j --;
        while (i < j && nums[i] === nums[i - 1]) i ++;
      }
    }
  }
  return res;
};
// @lc code=end

