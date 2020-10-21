/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits === "") return [];
  const map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  };
  const res = [];
  const start = 0;
  const str = '';
  letterCombinationsHelper(start, str, res, map, digits);
  return res;
};
/**
 * 
 * @param {*} start 要处理的输入的电话号码索引
 * @param {*} str 字符串
 * @param {*} res 结果集
 * @param {*} map 电话号码簿
 * @param {*} digits 输入的电话号码
 */
var letterCombinationsHelper = function(start, str, res, map, digits) {
  if (str.length === digits.length) {
    res.push(str);
    return ;
  }
  let curStrArr = map[digits[start]]; // 当前电话号码数字对应字符串数组
  for (let i = 0; i < curStrArr.length; i ++) {
    letterCombinationsHelper(start + 1, str + curStrArr[i], res, map, digits);
  }
};
// @lc code=end

