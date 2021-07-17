/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
    let map = new Map, count = 0, minLength = nums.length;

    for (let i of nums) {
        map.has(i) ? map.set(i, map.get(i) + 1) : map.set(i, 1);
        count = Math.max(count, map.get(i));
    }

    // 相同数据 arr
    let arr = [];

    for (let [key, value] of map) {
        if (value === count) {
            arr.push(key);
        }
    }

    // 相同数据取最小距离
    for (let i of arr) {
        minLength = Math.min(minLength, nums.lastIndexOf(i) - nums.indexOf(i) + 1);
    }

    return minLength;
};
// @lc code=end

