/*
 * @lc app=leetcode.cn id=724 lang=javascript
 *
 * [724] 寻找数组的中心索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    let sum = nums.reduce((a, b) => {
        return a + b;
    }, 0);
    let leftSum = 0;
    for (let i = 0; i < nums.length; i ++) {
        if (sum - nums[i] - leftSum === leftSum) {
            return i;
        } else {
            leftSum += nums[i];
        }
    }
    
    return -1;
};
// @lc code=end

