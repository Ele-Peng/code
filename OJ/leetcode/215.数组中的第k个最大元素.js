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

// // 一个整数数组, 将这个数组划分为一些连续的子数组, 将各个子数组内部元素进行排序后，整个数组是有序的，问最多能切成多少个子数组.
// // test case: [1, 3, 2, 4, 5, 7, 6, 8]
// // greedy
// function frequentSequence(nums) {
//   let res = [];
//   if (!nums.length) return res;
//   let count = 1;
//   let max = nums[0];
//   res[0] = [nums[0]];
//   for (let i = 1; i < nums.length; i ++) {
//     if (nums[i] > max) {
//       res[count] = [nums[i]];
//       count ++;
//       max = nums[i];
//     } else {
//       res[count - 1].push(nums[i]);
//     }
//   }
//   return res;
// }

// // dp
// function frequentSequence(nums) {
//   if (!nums.length) return [];
//   let dp = (new Array(nums.length)).fill(0);
//   dp[0] = 1;
//   for (let i = 1; i < nums.length; i ++) {
//     for (let j = i - 1; j >= 0; j --) {
//       let min = Math.min(...nums.slice(j, i));
//       if (nums[i] > min) {
//         dp[i] = Math.max(dp[i], dp[j] + 1);
//       }
//     }
//   }
//   return dp[nums.length - 1];
// }
// @lc code=end

