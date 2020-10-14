/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let res = [];
  combineHelper(n, k, 1, res, []);
  return res;
};
var combineHelper = function(n, k, start, paths, path) {
  // recursion terminator
  if (path.length === k) {
    paths.push(path.slice()); // 备份一份
  }
  // logic process
  for (let i = start; i <= n; i ++) { 
    path.push(i);
    // drill down
    combineHelper(n, k, i + 1, paths, path);
    path.pop();
  }
};
// @lc code=end

