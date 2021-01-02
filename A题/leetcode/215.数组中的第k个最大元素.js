/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  if (nums.length < 2) return nums[0];
  quickSort(nums, 0, nums.length - 1, k);
  return nums[nums.length - k];
};

function quickSort(nums, start, end, k) {
  if (start > end) return ;
  let left = start;
  let right = end;
  let target = nums[(start + end) >> 1];
  while (left <= right) {
    while (nums[left] < target) left ++;
    while (nums[right] > target) right --;
    if (left <= right) {
      swap(nums, left, right);
      left ++;
      right --;
    }
  }
  // 加入条件特判 优化
  if (right > start && nums.length - k <= right) quickSort(nums, start, right, k);
  if (left < end && nums.length - k >= left) quickSort(nums, left, end, k);
}

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

// @lc code=end

