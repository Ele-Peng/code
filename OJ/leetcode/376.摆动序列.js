/*
 * @lc app=leetcode.cn id=376 lang=javascript
 *
 * [376] 摆动序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
    let len = nums.length;
    let dp = (new Array(len)).fill(1);
    let res = 0;
    for (let i = 0; i < len; i ++) {
        //  如果不为第一个，初始情况为2；
        if (nums[0] !== nums[i]) dp[i] ++;
        for (let j = 0; j < i; j ++) {
            // 若为摆动序列，则 （当前 - 前一个）* （前一个 - 前前一个）< 0
            if ((nums[j] - nums[j - 1]) * (nums[i] - nums[j]) < 0) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        res = Math.max(res, dp[i]);
    }
    return res;
};
// @lc code=end

