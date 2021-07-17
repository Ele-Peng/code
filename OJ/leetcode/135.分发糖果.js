/*
 * @lc app=leetcode.cn id=135 lang=javascript
 *
 * [135] 分发糖果
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  if (!ratings || !ratings.length) return 0;

  let candies = (new Array(ratings.length)).fill(1);

  for (let i = 1; i < ratings.length; i ++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  for (let j = ratings.length - 2; j >= 0; j --) {
    if (ratings[j] > ratings[j + 1] && candies[j] <= candies[j + 1]) {
      candies[j] = candies[j + 1] + 1;
    }
  }

  return candies.reduce((a, b) => a + b, 0);
};
// @lc code=end

