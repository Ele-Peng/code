/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  // 预处理数组，形成一个对应的 charcode 数组
  let strsTemp = {};
  for (let i = 0;i < strs.length; i ++) {
    let temp = strs[i].split("").sort().join("");
    strsTemp[temp] ? strsTemp[temp].push(i) : strsTemp[temp] = [i]; // 存的是下标
  }
  let res = [];
  let keys = Object.keys(strsTemp);
  for (let i = 0; i < keys.length; i ++) {
    let temp = [];
    let key = strsTemp[keys[i]]
    for (let j = 0; j < key.length; j ++) {
      temp.push(strs[key[j]]);
    }
    res.push(temp);
  }
  return res;
};
// @lc code=end

