/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  let level = 0;
  let res = 0;
  var kthSmallestHelper = function(root, k) {
    // recursion terminator
    if (!root) return ;

    kthSmallestHelper(root.left, k);

    // current level logic
    level ++;
    if (k === level) {
      res = root.val;
      return ;
    }

    kthSmallestHelper(root.right, k);
    
  };
  kthSmallestHelper(root, k);
  return res;
};
// @lc code=end

