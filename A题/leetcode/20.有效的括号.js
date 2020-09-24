/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let str = s.split("");
  let stack = [];
  let symbolMap = {
    "}": "{",
    ")": "(",
    "]": "["
  }
  for (let i = 0; i < str.length; i ++) {
    if (str[i] === "{" || 
      str[i] === "[" ||
      str[i] === "(") {
        stack.push(str[i]);
    } else {
      let temp = stack.pop();
      if (symbolMap[str[i]] !== temp) {
        return false
      }
    }
  }
  return !stack.length;
};
// @lc code=end

