/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (!s || s.length < 2) return s;
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i ++) {
    let s1 = palindrome(s, i, i);
    let s2 = palindrome(s, i, i + 1);
    let maxLen = Math.max(s1, s2);
    if (maxLen > end - start) {
      start = i - ((maxLen - 1) >> 1);
      end = i + (maxLen >> 1);
    }
  }
  return s.substring(start, end + 1);
};

// 中心扩展法验证是否为最长回文子串
var palindrome = function(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left --;
    right ++;
  }
  return right - (left + 1);
};
// @lc code=end

