/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  let len = s.length;
  let i = -1;
  let stack = [];
  while( ++i < len) {
    if (stack.indexOf(s[i]) !== -1) continue;
    // 当栈顶元素大于当前元素 && s 从 i 至 s.length 之间，stack 的栈顶元素存在 && 栈不为空
    while ((stack[stack.length - 1] > s[i]) && (s.indexOf(stack[stack.length - 1], i) !== -1) && stack.length) {
      stack.pop();
    }
    stack.push(s[i]);
  }
  return stack.join('');
};
// @lc code=end

