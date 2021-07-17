/*
 * @lc app=leetcode.cn id=321 lang=javascript
 *
 * [321] 拼接最大数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber = function(nums1, nums2, k) {
  let r = (new Array(k)).fill(0), end = Math.min(k, nums1.length);
  for (let i = Math.max(0, k - nums2.length); i <= end; i ++) {
    console.log(r);
    console.log(merge(maxSubsequence(nums1, i), maxSubsequence(nums2, k - i)));
    r = max(r, merge(maxSubsequence(nums1, i), maxSubsequence(nums2, k - i)));
  }
  return r;
};
var max = function(nums1, nums2, p1 = p2 = -1, len1 = nums1.length) {
  // let p1 = -1, p2 = -1, len1 = nums1.length;
  while (p1 < len1 && nums1[++p1] === nums2[++p2]) {}
  return nums2[p2] > nums1[p1] ? nums2 : nums1;
};
var merge = function(nums1, nums2) {
  let p1 = 0, p2 = 0, r = [], len1 = nums1.length, len2 = nums2.length;
  while (p1 < len1 || p2 < len2) {
    if (p2 >= len2 || nums1[p1] > nums2[p2]) r.push(nums1[p1++]);
    else if (nums1[p1] === nums2[p2]) {
      let _p1 = p1, _p2 = p2;
      while (_p1 < len1 && nums1[++_p1] === nums2[++_p2]) {}
      r.push(_p2 >= len2 || nums1[_p1] > nums2[_p2] ? nums1[p1++] : nums2[p2++]);
    }
    else r.push(nums2[p2++]);
  }
  return r;
};
var maxSubsequence = function(nums, k) {
  let myStack = [], len = nums.length, top = -1, last = len - k;
  for (let i = 0; i < len; i ++) {
    while(top > -1 && nums[i] > myStack[top] && last > 0) {
      top --;
      last --;
    }
    top < k - 1 ? myStack[++top] = nums[i] : last --;
  }
  return myStack;
};
// @lc code=end

