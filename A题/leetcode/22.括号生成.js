/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let left = 0;
    let right = 0;
    let str = "";
    let res = [];
    if (n === 0) return [];
    generateParenthesisHelper(left, right, n, str, res);
    return res
};

var generateParenthesisHelper = function (left, right, n, str, res) {
    if (left === n && right === n) {
        res.push(str);
        return ;
    }
    if (left < n) generateParenthesisHelper(left + 1, right, n, str + "(", res);
    if (right < left) generateParenthesisHelper(left, right + 1, n, str + ")", res);
}
// @lc code=end

