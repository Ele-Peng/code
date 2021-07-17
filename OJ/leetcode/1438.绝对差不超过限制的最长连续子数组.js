/*
 * @lc app=leetcode.cn id=1438 lang=javascript
 *
 * [1438] 绝对差不超过限制的最长连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    let len = nums.length, res = 0, l = 0, r = -1;
    // 单调队列：max为单调递减队列 存储窗口内最大值，min为单调增队列 存储窗口内最小值
    let max = [], min = [];
    while(++r < len) {
        // 扩大窗口 维护单调队列
        while(max.length > 0 && max[max.length - 1] < nums[r]) max.pop();
        while(min.length > 0 && min[min.length - 1] > nums[r]) min.pop();
        max.push(nums[r]);
        min.push(nums[r]);
        // 若当前窗口内极值差大于limit 左移窗口l边界
        while(max[0] - min[0] > limit) {
            if(nums[l] === max[0]) max.shift();
            if(nums[l] === min[0]) min.shift();
            l ++;
        }
        // 维护窗口最大值
        res = Math.max(res, r - l + 1);
    }
    return res;
};
// @lc code=end

