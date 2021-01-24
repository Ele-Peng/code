/*
 * @lc app=leetcode.cn id=674 lang=javascript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    if (!nums.length) return 0;
    let dp = (new Array(nums.length)).fill(1);
    let max = 1;
    for (let i = 1; i < nums.length; i ++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = Math.max(dp[i - 1] + 1, dp[i]);
            max = Math.max(dp[i], max);
        }
    }
    return max;
};
// @lc code=end

