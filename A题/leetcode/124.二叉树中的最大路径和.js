/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
 * @return {number}
 */
var maxPathSum = function(root) {
  let payload = {
    max: root.val
  };
  dfsHelper(root, payload);
  return payload.max;
};
var dfsHelper = function(root, payload) {
  if (!root) return 0;
  let l = dfsHelper(root.left, payload);
  let r = dfsHelper(root.right, payload);

  payload.max = Math.max((
    root.val + Math.max(l, 0) + Math.max(r, 0)
  ), payload.max);
  return root.val + Math.max(l, r, 0);
};
// @lc code=end

