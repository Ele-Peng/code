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
    let preSum = {
        "0": 1
    };
    let sum_i = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i ++) {
        sum_i = sum_i + nums[i];
        if (preSum[`${sum_i - k}`] !== void 0) {
            ans += preSum[`${sum_i - k}`];
        }

        preSum[`${sum_i}`] = (preSum[`${sum_i}`] || 0) + 1;
    }
    
    return ans;
};
// @lc code=end
