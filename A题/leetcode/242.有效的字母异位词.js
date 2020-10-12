/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 字母码值
// var isAnagram = function(s, t) {
//   let sArr = s.split("")
//   let tArr = t.split("")
//   if (sArr.length !== tArr.length) return false;
//   let alphabet = new Array(26).fill(0);
//   for (let i = 0;i < sArr.length; i ++) {
//     alphabet[sArr[i].charCodeAt(0) - 'a'.charCodeAt(0)] ++;
//     alphabet[tArr[i].charCodeAt(0) - 'a'.charCodeAt(0)] --;
//   }
//   for (let i = 0;i < alphabet.length; i ++) {
//     if (typeof alphabet[i] !== "number" || alphabet[i] !== 0) return false;
//   }
//   return true;
// };

// 单纯的字母
// more earlier to break 
// var isAnagram = function(s, t) {
//   let sArr = s.split("")
//   let tArr = t.split("")
//   if (sArr.length !== tArr.length) return false;
//   let map = {};
//   for (let i = 0;i < sArr.length; i ++) {
//     map[sArr[i]] ? map[sArr[i]] ++ : map[sArr[i]] = 1;
//   }
//   for (let i = 0;i < tArr.length; i ++) {
//     if (map[tArr[i]]) {
//       map[tArr[i]] --;
//     } else {
//       return false;
//     }
//   }
//   return true;
// };

// sort 
var isAnagram = function(s, t) {
  let sArr = s.split("").sort().join('');
  let tArr = t.split("").sort().join('');
  return sArr === tArr;
};
// @lc code=end

