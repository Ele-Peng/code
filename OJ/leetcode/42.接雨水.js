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
// var trap = function(height) {
//   if (!height.length) return 0;
//   let area = 0;
//   let leftMax = 0; // 左边最高的柱子，能接水的话，必定小于它
//   let rightMax = 0; // 右边最高的柱子，能接水的话，必定小于它
//   for (let i = 0, j = height.length - 1; i !== j; ) {
//     if (height[i] < height[j]) {
//       if (height[i] > leftMax) {
//         leftMax = height[i];
//       } else {
//         area += (leftMax - height[i]);
//       }
//       i ++;
//     } else {
//       if (height[j] > rightMax) {
//         rightMax = height[j];
//       } else {
//         area += (rightMax - height[j]);
//       }
//       j --;
//     }
//   }
//   return area;
// };


// 栈

var trap = function(height) {
  let area = 0;
  let stack = [];
  let current = 0;
  while(current < height.length) {
    // 栈不为空 且 当前元素高度 要 大于 栈顶元素高度
    while(stack.length && height[current] > height[stack[stack.length - 1]]) {
      let h = height[stack[stack.length - 1]];
      stack.pop();
      if (!stack.length) break;
      let distance = current - stack[stack.length - 1] - 1;
      let min = Math.min(height[stack[stack.length - 1]], height[current]);
      area += distance * (min - h);
    }
    stack.push(current);
    current ++;
  }
  return area;
};
// @lc code=end

