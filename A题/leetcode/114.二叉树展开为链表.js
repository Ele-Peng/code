/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  if (root == null) return root;
  flatten(root.left);
  flatten(root.right);

  // 左右子树已经拉平成一条链表
  let left = root.left;
  let right = root.right;
  // 当前右子树 等于 左子树
  root.left = null;
  root.right = left;

  // 遍历当前右子树，将之前的右子树，挂到当前右子树上
  let p = root;
  while(p.right !== null) {
    p = p.right;
  }
  p.right = right;
};
// @lc code=end

