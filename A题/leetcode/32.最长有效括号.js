/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let maxLen = 0;
  let stack = [];
  stack.push(-1);

  for (let i = 0; i < s.length; i ++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length) {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      } else {
        stack.push(i);
      }
    }
  }

  return maxLen;
};
// @lc code=end

