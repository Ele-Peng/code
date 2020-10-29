/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        const mid = (left + right) >> 1;
        if (target < nums[0] && target > nums[mid]) { // nums[0] 小于 nums[mid] [0, mid]单调升序
            left = mid + 1;
        } else if (nums[0] <= nums[mid] && (target > nums[mid] || target < nums[0])) { // [0, mid]不单调时，
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left === right && nums[left] === target ? left : -1;
};
// @lc code=end

