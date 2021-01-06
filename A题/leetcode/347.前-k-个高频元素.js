/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
  let map = {};
  for (let i = 0; i < nums.length; i ++) {
      map[nums[i]] !== void 0 ? map[nums[i]]++ : map[nums[i]] = 1;
  }
  return topKSort(k, map);
};

var topKSort = function(k, map) {
  let list = Object.entries(map);
  quickSort(list, 0, list.length - 1, k);
  return list.slice(list.length - k, list.length).map(el => el[0]);
}

function quickSort(nums, start, end, k) {
  if (start > end) return ;
  let left = start;
  let right = end;
  let target = nums[(start + end) >> 1]; // 洗牌算法 随机化哨兵位置
  while (left <= right) {
      while (cmp(target, nums[left])) {
          left ++;
      }
      while (cmp(nums[right], target)) {
          right --;
      }
      if (left <= right) {
          swap(nums, left, right);
          left ++;
          right --;
      }
  }
  if (right > start && nums.length - k <= right) quickSort(nums, start, right, k);
  if (left < end && nums.length - k >= left)  quickSort(nums, left, end, k);
}

function swap(nums, a, b) {
  let temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
}

const cmp = (a, b) => {
  return a && b && a[1] > b[1];
}
// @lc code=end

