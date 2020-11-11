/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

const { lemonchiffon } = require("color-name");

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  if (!intervals.length) return 0;
  return intervals.length - overlapIntervals(intervals);
};


var overlapIntervals = function(intervals) {
  let len = intervals.length;
  const compare = (a, b) => {
    return a[1] - b[1];
  }
  intervals.sort(compare);

  let count = 1;
  let defaultIntervalEnd = intervals[0][1];
  
  for (let i = 0; i < len; i ++) {
    if (intervals[i][0] >= defaultIntervalEnd) {
      count ++;
      defaultIntervalEnd = intervals[i][1]; // 更新比较终点
    }
  }

  return count;
};
// @lc code=end

