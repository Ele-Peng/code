/*
 * @lc app=leetcode.cn id=665 lang=javascript
 *
 * [665] 非递减数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i ++) {
        if (nums[i] > nums[i + 1]) {
            count ++;
            if (i > 0 && nums[i + 2] !== void 0 && nums[i] > nums[i + 2] && nums[i - 1] > nums[i + 1]) {
                count ++;
            }
        }
        if (count > 1) break;
    }
    return count < 2;
};
// @lc code=end

