/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// loop count zero
// var moveZeroes = function(nums) {
//   let zeroCount = 0
//   let notZeroIndex = 0
//   for (let i = 0; i < nums.length; i += 1) {
//     if (nums[i] !== 0) {
//       // 记录不为0的数组下标
//       nums[notZeroIndex] = nums[i]
//       notZeroIndex++
//     } else {
//       zeroCount += 1
//     }
//   }
//   let baseLength = nums.length - zeroCount
//   for (let i = baseLength; i < nums.length; i += 1) {
//       nums[i] = 0
//   }
//   return nums
// };






// 双指针 第二遍
// 比0大的，即不为0的放到左边，否则放到右边；
var moveZeroes = function(nums) {
  let current = 0;
  for (let i = 0; i < nums.length; i ++) {
    if (nums[i] !== 0) {
      let temp = nums[i];
      nums[i] = nums[current];
      nums[current] = temp;
      current ++;
    }
  }
  return nums
};
// @lc code=end

