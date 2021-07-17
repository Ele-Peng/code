/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  const cmp = (a, b) => {return a - b;}
  nums.sort(cmp);
  return nSumTarget(nums, target, 4, 0);
};
var nSumTarget = function(nums, target, n, start) {
  let len = nums.length;
  let res = [];
  if (n < 2 || len < n) return res;
  if (n === 2) {
    let low = start, high = len - 1;
    while (low < high) {
      let sum = nums[low] + nums[high];
      let left = nums[low], right = nums[high];
      if (sum < target) {
        while (low < high && nums[low] === left) low ++; 
      } else if (sum > target) {
        while (low < high && nums[high] === right) high --;
      } else {
        res.push([left, right]);
        while (low < high && nums[low] === left) low ++;
        while (low < high && nums[high] === right) high --;
      }
    }
  } else {
    for (let i = start; i < len; i ++) {
      let subRes = nSumTarget(nums, target - nums[i], n - 1, i + 1);
      for (let j = 0; j < subRes.length; j ++) {
        subRes[j].push(nums[i]);
        res.push(subRes[j]);
      }
      while (i < len - 1 && nums[i] == nums[i + 1]) i++;
    }
  }
  return res;
};
// @lc code=end

