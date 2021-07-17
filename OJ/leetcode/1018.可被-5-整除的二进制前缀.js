/*
 * @lc app=leetcode.cn id=1018 lang=javascript
 *
 * [1018] 可被 5 整除的二进制前缀
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(A) {
    let i = -1, n = 0;
    while (++i < A.length) {
        A[i] = (n = ((n << 1) + A[i]) % 5) === 0;
    }
    return A;
};
// @lc code=end

