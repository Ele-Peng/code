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
var jump = function(nums) {
  let farthestPos = 0;
  let endOfCanReach = 0;
  let steps = 0;
  for (let i = 0; i < nums.length - 1; i ++) {
    farthestPos = Math.max(farthestPos, i + nums[i]);
    if (i === endOfCanReach) {
      endOfCanReach = farthestPos;
      steps++;
    }
    if (endOfCanReach >= nums.length - 1) {
      break;
    }
  }
  return steps;
};
// @lc code=end

