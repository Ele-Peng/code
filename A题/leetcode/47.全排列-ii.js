/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  let res = [];
  let defaultNum = {};
  // 统计字符出现个数
  for (let i = 0; i < nums.length; i ++) {
    defaultNum[nums[i]] ? defaultNum[nums[i]] ++ : defaultNum[nums[i]] = 1;
  }
  let usedNum = {... defaultNum};
  nums = nums.sort();
  permuteUniqueHelper(nums, res, [], usedNum);
  return res;
};
/**
 * 
 * @param {*} nums 传入的可使用数组
 * @param {*} res 结果
 * @param {*} path 当前层结果
 * @param {*} usedNum 使用过的map
 * @param {*} defaultNum 初始map
 */
var permuteUniqueHelper = function(nums, res, path, usedNum) {
  // recursion terminator
  if (path.length === nums.length) {
    res.push(path.slice());
    return ;
  }
  // current level logic
  for (let i = 0; i < nums.length; i ++) {
    if (nums[i - 1] == nums[i] && i - 1 >= 0 && usedNum[nums[i]]) { // 避免产生重复的排列
      continue;
    }
    if (usedNum[nums[i]] !== void 0 && usedNum[nums[i]] === 0) continue;
    usedNum[nums[i]] --; // 使用次数减一
    path.push(nums[i]);
    permuteUniqueHelper(nums, res, path, usedNum);
    path.pop();
    usedNum[nums[i]] ++; // 撤销使用记录 
  }
};
// @lc code=end

