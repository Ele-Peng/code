/*
 * @lc app=leetcode.cn id=1009 lang=javascript
 *
 * [1009] 十进制整数的反码
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function(N) {
    if (N === 0) return 1;
    let count = 0;
    let res = 0;
    while (N) {
        let temp = N ^ 1;
        if (temp % 2 === 1) {
            res += Math.pow(2, count)
        }
        count ++;
        N >>= 1;
    }
    return res;
};
// @lc code=end

