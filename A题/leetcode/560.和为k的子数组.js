/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为K的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let preSum = [0];
    for (let i = 0; i < nums.length; i ++) {
        preSum[i + 1] = nums[i] + preSum[i];
    }
    let ans = 0;
    for (let i = 1; i <= nums.length; i ++) {
        for (let j = 0; j < i; j ++) {
            if (preSum[i] - preSum[j] === k) {
                ans ++;
            }
        }
    }
    return ans;
};
// @lc code=end

