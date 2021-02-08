/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  let need = new Map; // 需要凑齐的字符数
  let window = new Map; // 窗口中的字符数

  let left = 0, right = 0;
  let valid = 0; // 窗口中满足 need 条件的个数

  let res = [];

  for (let str of p) {
    need.has(str) ? need.set(str, need.get(str) + 1) : need.set(str, 1);
  }

  while (right < s.length) {
    let c = s[right];
    right ++;
    // 进行窗口内数据的一系列更新
    if (need.has(c)) {
      window.has(c) ? window.set(c, window.get(c) + 1) : window.set(c, 1);
      if (window.get(c) === need.get(c)) valid ++;
    }

    // 判断左侧窗口是否要收缩
    if (right - left >= p.length) {
      if (valid === need.size) {
        res.push(left);
      }
      let d = s[left];
      left ++;
      // 进行窗口内数据的一系列更新
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid --;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  return res;
};
// @lc code=end

