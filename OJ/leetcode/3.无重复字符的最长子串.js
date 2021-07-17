/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let window = new Map;
  let left = 0, right = 0;
  let res = 0;

  while (right < s.length) {
    let c = s[right];
    right ++;
    window.has(c) ? window.set(c, window.get(c) + 1) : window.set(c, 1);

    while (window.get(c) > 1) {
      let d = s[left];
      left ++;
      window.set(d, window.get(d) - 1);
    }
    res = Math.max(res, right - left);
  }
  return res;
};
// @lc code=end

