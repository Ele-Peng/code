/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

 
var merge = function(nums1, m, nums2, n) {
    let nums1Tail = m - 1;
    let nums2Tail = n - 1;
    let len = m + n - 1;
    while (nums1Tail >= 0 && nums2Tail >= 0) {
        nums1[len --] = nums1[nums1Tail] > nums2[nums2Tail] ? nums1[nums1Tail--] : nums2[nums2Tail--];
    }
};
// @lc code=end

