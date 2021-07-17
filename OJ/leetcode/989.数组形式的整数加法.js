/*
 * @lc app=leetcode.cn id=989 lang=javascript
 *
 * [989] 数组形式的整数加法
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
  if (!A.length && K === "") return "";
  if (!A.length && K !== "") return K;
  if (A.length && K === "") return A.join("");
  let tempK = K.toString().split("").map(item => { return Number(item)});
  let i = tempK.length - 1, j = A.length - 1;
  let res = [];
  while (i >= 0 && j >= 0) {
    res.unshift(tempK[i] + A[j]);
    i --;
    j --;
  }
  while (i >= 0) {
    res.unshift(tempK[i]);
    i --;
  }
  while (j >= 0) {
    res.unshift(A[j]);
    j --;
  }
  for (let k = res.length - 1; k >= 0; k --) {
    if (res[k] > 9) {
      if (k - 1 >= 0) {
        res[k - 1] ++;
        res[k] = res[k] - 10;
      } else {
        res[k] = res[k] - 10;
        res.unshift(1);
      }
    }
  }
  return res;
};
// @lc code=end

