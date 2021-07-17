/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// Map O(nlogn)
// var twoSum = function(nums, target) {
//     let map = {};
//     for (let i = 0; i < nums.length; i ++) {
//         if (map[target - nums[i]] !== void 0 && (map[target - nums[i]] !== i)) return [map[target - nums[i]], i];
//         map[nums[i]] = i;
//     }
// };


// 双指针

// var twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length - 1; i ++) {
//         for (let j = i + 1; j < nums.length; j ++) {
//             if (nums[i] + nums[j] === target) {
//                 return [i, j];
//             }
//         }
//     }
// };


// 第三遍 hash
var twoSum = function(nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i ++) {
    if (map[target - nums[i]] !== void 0 && map[target - nums[i]] !== i) {
      return [map[target - nums[i]], i];
    }
    map[nums[i]] = i;
  }
};


// @lc code=end

