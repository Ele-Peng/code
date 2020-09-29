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
// var rotate = function(nums, k) {
//   let tempEnd, tempStart;
//   for (let i = 0; i < k; i ++) {
//     tempEnd = nums[nums.length - 1];
//     for (let j = 0; j < nums.length; j ++) {
//       tempStart = nums[j];
//       nums[j] = tempEnd;
//       tempEnd = tempStart;
//     }
//   }
// };

// 三次交换
var rotate = function(nums, k) {
  let n = nums.length;
  k %= n;
  if (n == 1) {
    return;
  }
  let temp = 0;
  rotateHelper(0, n - 1);
  rotateHelper(0, k - 1);
  rotateHelper(k, n - 1);
  function rotateHelper(start, end) {
    while(start < end) {
      temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start ++;
      end --;
    }
  }
};

// @lc code=end

