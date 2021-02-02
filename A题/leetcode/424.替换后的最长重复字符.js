/*
 * @lc app=leetcode.cn id=424 lang=javascript
 *
 * [424] 替换后的最长重复字符
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    if (!s) return 0;
    let codes = Array(26).fill(0);
    let i = 0;
    let max = 0;
    for (let j = 0; j < s.length; j ++) {
        let n = s[j].charCodeAt() - 65;
        codes[n] ++;
        max = Math.max(max, codes[n]);
        if (j - i + 1 > max + k) {
            codes[ s[i].charCodeAt() - 65 ] -= 1
            i ++;
        }
    }
    return s.length - i;
};
// @lc code=end

