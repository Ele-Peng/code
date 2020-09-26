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
// 辅助栈
var merge = function(nums1, m, nums2, n) {
    let stackHelper = [];
    for (let i = 0, j = 0; i + j < m + n; ) {
        if ((nums2[j] === void 0) || (i < m && nums1[i] <= nums2[j])) {
            stackHelper.push(nums1[i]);
            i ++;
        } else {
            stackHelper.push(nums2[j]);
            j ++;
        }
    }
    for (let i = 0; i < m + n; i ++) {
        nums1[i] = stackHelper[i];
    }
};
// @lc code=end

