/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let map = {};
  let len = s.length;
  for (let i = 0; i < s.length; i ++) {
    map[s[i]] = map[s[i]] !== void 0 ? i + len : i;
  }
  for (let key in map) {
    if (map[key] < len) {
      return map[key];
    }
  }
  return -1;
};
// @lc code=end

