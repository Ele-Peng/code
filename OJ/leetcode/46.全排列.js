/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let res = [];
  let usedNum = {};
  permuteHelper(nums, res, [], usedNum);
  return res;
};

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

var permuteHelper = function(nums, res, path, usedNum) {
  // recursion terminator
  if (path.length === nums.length) {
    res.push(path.slice());
  }
  // current level logic 
  // 与77题不同的是，下一个新的结果，没有数字特判需求
  for (let i = 0; i < nums.length; i ++) {
    if (usedNum[nums[i]]) continue;
    path.push(nums[i]);
    usedNum[nums[i]] = true;
    // drill down
    permuteHelper(nums, res, path, usedNum);
    path.pop();
    usedNum[nums[i]] = false;
  }
};
// @lc code=end

