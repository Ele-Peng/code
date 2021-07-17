/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  // nums1 是 nums2 的子集
  // 将 nums2 next greater Number 求出来，再存放进 map 中
  // 已 nums1 做 key 取出，便是结果

  // nums Next Greater Number
  let ansMap = {};
  let stack = [];
  
  for (let i = nums2.length - 1; i >= 0; i --) {
    while (stack.length && stack[stack.length - 1] <= nums2[i]) {
      stack.pop();
    }
    ansMap[nums2[i]] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums2[i]);
  }
  return nums1.map(item => ansMap[item])
};
// @lc code=end

