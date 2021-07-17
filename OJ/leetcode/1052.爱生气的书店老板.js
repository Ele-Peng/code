/*
 * @lc app=leetcode.cn id=1052 lang=javascript
 *
 * [1052] 爱生气的书店老板
 */

// @lc code=start
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    let len = customers.length
    if (len === 0 || grumpy.length === 0) return 0
    let max = 0
    let left = 0, right = 0
    while (right < len) {
        while (right - left === X - 1) {
            let nowValue = 0
            for (let i = left; i <= right; i++) {
                if (grumpy[i] === 1) {
                    nowValue += customers[i]
                }
            }
            max = nowValue > max ? nowValue : max
            left++
        }
        right++
    }
    let result = 0
    for (let i = 0; i < len; i++) {
        if (grumpy[i] === 0) {
            result += customers[i]
        }
    }
    return result + max
};
// @lc code=end

