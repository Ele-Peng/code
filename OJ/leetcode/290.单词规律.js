/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    let patternLen = pattern.length;
    let patternSet = new Set(pattern.split(""));
    let strLen = s.split(" ").length;
    let sSet = new Set(s.split(" "));
    if (patternLen !== strLen) return false;
    if (patternSet.size !== sSet.size) return false;
    s = s.split(' ');
    let different = 0;
    for (let i = 1; i < patternLen; i ++) {
        if (pattern[i] !== pattern[i - 1] && s[i] !== s[i - 1]) {
            continue;
        } else if (pattern[i] === pattern[i - 1] && s[i] === s[i - 1]) {
            continue;
        }
        return false;
    }
    return true;
};
// @lc code=end

