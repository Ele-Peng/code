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
// 预处理下标
// var groupAnagrams = function(strs) {
//   // 预处理数组，形成一个对应的 charcode 数组
//   let strsTemp = {};
//   for (let i = 0;i < strs.length; i ++) {
//     let temp = strs[i].split("").sort().join("");
//     strsTemp[temp] ? strsTemp[temp].push(i) : strsTemp[temp] = [i]; // 存的是下标
//   }
//   let res = [];
//   let keys = Object.keys(strsTemp);
//   for (let i = 0; i < keys.length; i ++) {
//     let temp = [];
//     let key = strsTemp[keys[i]]
//     for (let j = 0; j < key.length; j ++) {
//       temp.push(strs[key[j]]);
//     }
//     res.push(temp);
//   }
//   return res;
// };


// 优化预处理直接为该数组 + for in Object

// var groupAnagrams = function(strs) {
//   let strsTemp = {};
//   for (let i = 0;i < strs.length; i ++) {
//     let key = strs[i].split("").sort().join("");
//     strsTemp[key] ? strsTemp[key].push(strs[i]) : strsTemp[key] = [strs[i]];
//   }
//   let res = [];
//   for (let i in strsTemp) {
//     res.push(strsTemp[i]);
//   }
//   return res;
// };


// 第三遍
var groupAnagrams = function(strs) {
  let map = new Map;
  for (let i = 0; i < strs.length; i ++) {
    let key = strs[i].split("").sort().join("");
    if (map.has(key)) {
      let arr = map.get(key);
      arr.push(strs[i]);
      map.set(key, arr);
    } else {
      map.set(key, [ strs[i] ]);
    }
  }
  let res = [];
  for (let key of map) {
    res.push(key[1]);
  }
  return res;
} 
// @lc code=end

