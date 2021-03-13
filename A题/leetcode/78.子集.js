/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let res = [], path = [], start = 0;
    subsetsHelper(start, path, res, nums);
    return res;
};

var subsetsHelper = function(start, path, res, nums) {
    res.push(path.slice());
    for (let i = start; i < nums.length; i ++) {
        path.push(nums[i]);
        subsetsHelper(i + 1, path, res, nums); // 需传入 i， 不是 start
        path.pop();
    }
};
// @lc code=end

