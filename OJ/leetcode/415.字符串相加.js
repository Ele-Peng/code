/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let len1 = num1.length - 1;
  let len2 = num2.length - 1;

  let max = Math.max(len1, len2);
  let res = (new Array(max + 1)).fill(0);
  let idx = max;
  while (len1 >= 0 || len2 >= 0) {
    let a = num1[len1] || 0;
    let b = num2[len2] || 0;
    res[idx] = Number(a) + Number(b);
    len1 --;
    len2 --;
    idx --;
  }
  for (let i = res.length - 1; i >= 0; i --) {
    if (res[i] >= 10 && i !== 0) {
      res[i - 1] += 1;
      res[i] = res[i] - 10;
    } else if (res[i] >= 10 && i === 0) {
      res[i] = res[i] - 10;
      res.unshift(1);
    }
  }
  let ans = '';
  for (let i = 0; i < res.length; i ++) {
      ans += res[i];
  }
  return ans;
};
// @lc code=end

