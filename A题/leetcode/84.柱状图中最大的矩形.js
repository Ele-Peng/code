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
var largestRectangleArea = function(heights) {
    if (!heights.length) return 0;
    let area = 0;
    for (let i = 0; i < heights.length; i ++) {
      let leftIndex = i;
      let rightIndex = i;
      let h = heights[i]; // 基准点，往前往后遍历求解
      while(heights[leftIndex - 1] >= h) {
        leftIndex --;
      }
      while(heights[rightIndex + 1] >= h) {
        rightIndex ++;
      }
      let distance = rightIndex - leftIndex + 1;
      area = Math.max(area, distance * h);
    }
    return area;
};
// @lc code=end

