/*
 * @lc app=leetcode.cn id=1208 lang=javascript
 *
 * [1208] 尽可能使字符串相等
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {
    let left = 0, right = 0, maxSum = 0;
    for (let i = 0; i < s.length; i ++) {
        maxSum += Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
        if (maxSum > maxCost) {
            maxSum -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
            left ++;
        }
        right ++;
    }
    return right - left;
};
// @lc code=end

