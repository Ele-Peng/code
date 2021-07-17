/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// var constructMaximumBinaryTree = function(nums) {
//   if (!nums.length) return null;
//   const findMaxIndex = (nums) => {
//     let max = 0;
//     let maxIndex = 0;
//     nums.forEach((item, index) => {
//       if (item > max) {
//         maxIndex = index;
//         max = item;
//       }
//     })
//     return maxIndex;
//   }
//   let index = findMaxIndex(nums);
//   let root = new TreeNode(nums[index]);
//   root.left = constructMaximumBinaryTree(nums.slice(0, index));
//   root.right = constructMaximumBinaryTree(nums.slice(index + 1));
//   return root;
// };


var constructMaximumBinaryTree = function(nums) {
  return constructMaximumBinaryTreeHelper(nums, 0, nums.length - 1);
};


/**
 * 
 * @param {*} nums 数据集
 * @param {*} left 起始索引
 * @param {*} right 终止索引
 */
var constructMaximumBinaryTreeHelper = function(nums, left, right) {
  // recursion terminator
  if (left > right) return null;

  // current level logic
  let index = left;
  let max = nums[left];
  for (let i = left + 1; i <= right; i ++) {
    if (nums[i] > max) {
      index = i;
      max = nums[i];
    }
  }

  // drill down
  let root = new TreeNode(max);
  root.left = constructMaximumBinaryTreeHelper(nums, left, index - 1);
  root.right = constructMaximumBinaryTreeHelper(nums, index + 1, right);
  return root;
};
// @lc code=end

