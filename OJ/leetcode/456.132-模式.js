/*
 * @lc app=leetcode.cn id=456 lang=javascript
 *
 * [456] 132模式
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    if (nums.length < 3) return false;
    let medium = Number.MIN_SAFE_INTEGER, stack = [];
    for (let i = nums.length - 1; i >= 0; i --) {
        if (nums[i] < medium) return true;
        while (stack.length && stack[stack.length - 1] < nums[i]) {
            medium = stack.pop();
        }
        stack.push(nums[i]);
    }
    return false;
};
// @lc code=end

