/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var jump = function(nums) {
//   let farthestPos = 0;
//   let endOfCanReach = 0;
//   let steps = 0;
//   for (let i = 0; i < nums.length - 1; i ++) {
//     farthestPos = Math.max(farthestPos, i + nums[i]);
//     if (i === endOfCanReach) {
//       endOfCanReach = farthestPos;
//       steps++;
//     }
//     if (endOfCanReach >= nums.length - 1) {
//       break;
//     }
//   }
//   return steps;
// };


var jump = function(nums) {
  let len = nums.length;
  let end = 0; // 跳跃的暂时终点
  let farthest = 0; // [i, ... end] 跳到的最远距离
  let jump = 0; // 跳跃次数

  for (let i = 0; i < len - 1; i ++) {
    farthest = Math.max(farthest, nums[i] + i);
    if (end === i) {
      jump ++;
      end = farthest;
    }
  }

  return jump;
};
// @lc code=end

