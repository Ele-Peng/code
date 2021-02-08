/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  let need = new Map; // 需要凑齐的字符数
  let window = new Map; // 窗口中的字符数

  let left = 0, right = 0;

  let valid = 0; // 窗口中满足 need 条件的个数

  for (let s of s1) {
    need.has(s) ? need.set(s, need.get(s) + 1) : need.set(s, 1);
  }

  while (right < s2.length) {
    let c = s2[right];
    right ++;
    if (need.has(c)) {
      window.has(c) ? window.set(c, window.get(c) + 1) : window.set(c, 1);
      if (window.get(c) === need.get(c)) valid ++;
    }

    while (right - left >= s1.length) {
      if (valid === need.size) return true;
      let d = s2[left];
      left ++;
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid --;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  return false;
};
// @lc code=end

