/*
 * @lc app=leetcode.cn id=659 lang=javascript
 *
 * [659] 分割数组为连续子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
    let res = [];
    let numMap = new Map;
    let len = nums.length;
    if (len < 3) return false;
    for (let i = 0; i < nums.length; i ++) {
        numMap.has(nums[i]) ? numMap.set(nums[i], numMap.get(nums[i]) + 1) : numMap.set(nums[i], 1);
    }
    let max = len;
    let min = 3;
};
// @lc code=end

