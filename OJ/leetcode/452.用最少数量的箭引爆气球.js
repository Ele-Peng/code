/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  let len = points.length;
  if (!len) return 0;
  const compare = (a, b) => {
    return a[1] - b[1];
  }; // 按照结束坐标升序排列
  points.sort(compare);

  let pointDefaultEnd = points[0][1];
  let count = 1;

  for (let i = 0; i < len; i ++) {
    if (points[i][0] > pointDefaultEnd) {
      count ++;
      pointDefaultEnd = points[i][1];
    }
  }

  return count;
};
// @lc code=end

