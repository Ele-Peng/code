/*
 * @lc app=leetcode.cn id=643 lang=javascript
 *
 * [643] 子数组最大平均数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let sum = 0;
    let max = -Infinity;
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
        if (i >= k) sum -= nums[i - k];
        if (i >= k - 1) max = Math.max(max, sum / k);
    }
    return max;
};
// @lc code=end

