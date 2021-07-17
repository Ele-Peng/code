/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let len = digits.length - 1;
    for (let i = len; i >= 0; i --) {
        digits[i] ++;
        digits[i] = digits[i] % 10;
        if (digits[i]) return digits;
    }
    digits.unshift(1);
    return digits;
};
// @lc code=end

