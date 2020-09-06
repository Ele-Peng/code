/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return 1;
    let f = new Array(nums.length + 1).fill(1);
    for (let i = 1; i < nums.length; i ++) {
        // 第 j 元素，前 i 个元素
        for (let j = 0; j < i; j ++) {
            // console.log(f);
            if (nums[i] > nums[j] && f[j] + 1 > f[i]) {
                f[i] = f[j] + 1;
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < nums.length; i ++) {
        if (f[i] > ans) {
            ans = f[i]
        }
    }
    return ans;
};
// @lc code=end

