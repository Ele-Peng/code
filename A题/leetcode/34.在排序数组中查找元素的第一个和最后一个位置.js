/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    return midSearch(nums, target);
};
var midSearch = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = (left + right) >> 1;
        if (target < nums[mid]) {
            right = mid - 1;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else {
            let leftIndex = mid;
            while(nums[leftIndex - 1] === nums[mid]) {
                leftIndex --;
            }
            let rightIndex = mid;
            while(nums[rightIndex + 1] === nums[mid]) {
                rightIndex ++;
            }
            return [leftIndex, rightIndex];
        }
    }
    return [-1, -1];
};
// @lc code=end

