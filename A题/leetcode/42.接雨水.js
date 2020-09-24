/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针
var trap = function(height) {
  if (!height.length) return 0;
  let area = 0;
  let leftMax = 0; // 左边最高的柱子，能接水的话，必定小于它
  let rightMax = 0; // 右边最高的柱子，能接水的话，必定小于它
  for (let i = 0, j = height.length - 1; i !== j; ) {
    if (height[i] < height[j]) {
      if (height[i] > leftMax) {
        leftMax = height[i];
      } else {
        area += (leftMax - height[i]);
      }
      i ++;
    } else {
      if (height[j] > rightMax) {
        rightMax = height[j];
      } else {
        area += (rightMax - height[j]);
      }
      j --;
    }
  }
  return area;
};
// @lc code=end

