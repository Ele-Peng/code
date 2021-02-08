/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let need = new Map;
  let window = new Map;
  for (let i of t) {
    if (need.has(i)) need.set(i, need.get(i) + 1);
    else need.set(i, 1);
  }
  
  let left = 0, right = 0;
  let valid = 0; // 窗口中满足 need 条件的字符个数

  // 最小覆盖子串的起始索引及长度
  let start = 0, len = Number.MAX_SAFE_INTEGER;

  while (right < s.length) {
    let c = s[right]; // 即将移入窗口的字符
    right ++; // 右移窗口
    // 进行窗口内数据的一系列更新
    if (need.has(c)) {
      if (window.has(c)) {
        window.set(c, window.get(c) + 1);
      }
      else window.set(c, 1);
      if (window.get(c) === need.get(c)) {
        valid ++;
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid === need.size) {
      // 这里更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      let d = s[left]; // 即将移出窗口的字符
      left ++; // 左移窗口
      // 进行窗口内数据的一系列更新
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid --;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }
  return len === Number.MAX_SAFE_INTEGER ? "" : s.substr(start, len);
};
// @lc code=end

