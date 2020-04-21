/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 枚举 left bar, right bar, (x-y)*height_diff
// O(n^2)
// var maxArea = function(height) {
//   let max = 0
//   for (let i = 0; i < height.length; i ++) {
//     for (let j = i + 1; j < height.length; j ++) {
//       let area = (j - i) * Math.min(height[i], height[j])
//       max = Math.max(max, area)
//     }
//   }
//   return max
// };

// O(n)
var maxArea = function(height) {
  let max = 0
  for (let i = 0, j = height.length - 1; i < j; ) {
    let minHeight = height[i] < height[j] ? height[i ++] : height[j --]
    // 如果minHeight在i,i会往右移，i+=1；如果minHeight在j,j会往左移，j-=1
    // 要统计当前的话，i --> (j - (i - 1)); j --> (j + 1 - i)
    let area = (j - i + 1) * minHeight
    max = Math.max(max, area)
  }
  return max
};
// @lc code=end

