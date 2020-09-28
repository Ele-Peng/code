/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// space O(n) 但申请了一个新数组
// var rotate = function(nums, k) {
//   let res = new Array(nums.length);
//   for (let i = 0; i < nums.length; i ++) {
//     res[(i + k) % nums.length] = nums[i];
//   }
//   for (let i = 0; i < nums.length; i ++) {
//     nums[i] = res[i];
//   }
// };

// 暴力 O(n * k)
var rotate = function(nums, k) {
  let tempEnd, tempStart;
  for (let i = 0; i < k; i ++) {
    tempEnd = nums[nums.length - 1];
    for (let j = 0; j < nums.length; j ++) {
      tempStart = nums[j];
      nums[j] = tempEnd;
      tempEnd = tempStart;
    }
  }
};


// @lc code=end

