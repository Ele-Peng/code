/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var findMin = function(nums) {
//     let left = 0;
//     let right = nums.length - 1;
//     while (left < right) {
//         const mid = (left + right) >> 1;
//         if (nums[mid] > nums[right]) {
//             left = mid + 1;
//         } else {
//             right = mid;
//         }
//     }
//     return nums[left];
// };

var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};
// @lc code=end

