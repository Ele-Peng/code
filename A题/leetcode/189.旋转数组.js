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

// space O(n)
// var rotate = function(nums, k) {
//   let res = new Array(nums.length);
//   for (let i = 0; i < nums.length; i ++) {
//     res[(i + k) % nums.length] = nums[i];
//   }
//   for (let i = 0; i < nums.length; i ++) {
//     nums[i] = res[i];
//   }
// };

//
var rotate = function(nums, k) {
    for (let i = 0; i < nums.length; i ++) {
        let temp = nums[i];
        nums[i] = nums[(i + k) % nums.length];
        nums[(i + k) % nums.length] = temp;
        console.log(nums);
        console.log("=====");
    }
};
// @lc code=end

