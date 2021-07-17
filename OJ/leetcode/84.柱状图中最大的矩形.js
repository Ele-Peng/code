/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
// 双指针暴力
// var largestRectangleArea = function(heights) {
//     if (!heights.length) return 0;
//     let area = 0;
//     for (let i = 0; i < heights.length; i ++) {
//       let leftIndex = i;
//       let rightIndex = i;
//       let h = heights[i]; // 基准点，往前往后遍历求解
//       while(heights[leftIndex - 1] >= h) {
//         leftIndex --;
//       }
//       while(heights[rightIndex + 1] >= h) {
//         rightIndex ++;
//       }
//       let distance = rightIndex - leftIndex + 1;
//       area = Math.max(area, distance * h);
//     }
//     return area;
// };


// 单调栈
var largestRectangleArea = function(heights) {
  let area = 0;
  let stack = [];
  let current = 0;
  heights = [0, ...heights, 0];
  while (current < heights.length) {
    // 栈不为空 且 当前元素 要 大于 栈顶元素
    while(stack.length && heights[current] < heights[stack[stack.length - 1]]) {
      let h = heights[stack[stack.length - 1]];
      stack.pop();
      if (!stack.length) break;
      area = Math.max(area, (current - stack[stack.length - 1] - 1) * h)
    }
    stack.push(current);
    current ++;
  }
  return area;
};
// @lc code=end

