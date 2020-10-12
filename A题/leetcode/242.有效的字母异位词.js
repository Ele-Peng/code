/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  let sArr = s.split("")
  let tArr = t.split("")
  if (sArr.length !== tArr.length) return false;
  let alphabet = new Array(26).fill(0);
  for (let i = 0;i < sArr.length; i ++) {
    alphabet[sArr[i].charCodeAt(0) - 'a'.charCodeAt(0)] ++;
    alphabet[tArr[i].charCodeAt(0) - 'a'.charCodeAt(0)] --;
  }
  for (let i = 0;i < alphabet.length; i ++) {
    if (typeof alphabet[i] !== "number" || alphabet[i] !== 0) return false;
  }
  return true;
};
// @lc code=end

