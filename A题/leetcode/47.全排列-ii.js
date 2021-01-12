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

// 产生形式是 字符串数组
// function allPossibilites(str) {
//   let strArr = str.split("");
//   let res = []; // 结果集
//   let path = ""; // 每一次的结果
//   let len = strArr.length;
//   const used = (new Array(len)).fill(false);

//   allPossibilitesHelper(strArr, res, path, len, used);
//   return res;
// }

// function allPossibilitesHelper(strArr, res, path, len, used) {
//   if (res.indexOf(path) !== -1) return ;
//   // base case
//   if (path.length === len) {
//       return res.push(path.slice());
//   }
//   // logic 
//   for (let i = 0; i < len; i ++) {
//       if (!used[i]) {
//           // 选了
//           let tempPath = path + strArr[i];
//           used[i] = true;
//           allPossibilitesHelper(strArr, res, tempPath, len, used);
//           used[i] = false;
//       }
//   }
// }
// allPossibilites("abbc");
// @lc code=end

