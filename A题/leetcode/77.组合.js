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
/**
 * 
 * @param {*} n 1 ... n 数组 1 ~ n
 * @param {*} k 取 k 个数
 * @param {*} start 从哪个开始取（不从数组下标0开始）
 * @param {*} paths 结果集
 * @param {*} path 单个结果
 */
var combineHelper = function(n, k, start, paths, path) {
  // recursion terminator
  if (path.length === k) {
    paths.push(path.slice()); // 备份一份
  }
  // logic process
  for (let i = start; i <= n; i ++) { 
    path.push(i); // 选
    // drill down
    combineHelper(n, k, i + 1, paths, path);
    path.pop(); // 不选
  }
};
// @lc code=end

