/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let map = {};
  for (let i = 0; i < nums.length; i ++) {
    map[nums[i]] ? map[nums[i]] ++ : map[nums[i]] = 1;
  }
  let max = 0; // 最大值
  let pointKey = 0; // 最大值 所在 map 中的 key
  Object.keys(map).forEach((item) => {
    if (map[item] > max) {
      max = map[item];
      pointKey = item;
    }
  });
  return pointKey;
};
// @lc code=end

