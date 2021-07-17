/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
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
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// var lowestCommonAncestor = function(root, p, q) {
//     if (root === null) return null;
//     if (root === p || root === q) return root;
//     let left = lowestCommonAncestor(root.left, p, q);
//     let right = lowestCommonAncestor(root.right, p, q);
//     if (left !== null && right !== null) {
//         return root;
//     }
//     if (left === null && right === null) {
//         return null;
//     }
//     return left === null ? right : left;
// };



// var lowestCommonAncestor = function(root, p, q) {
//   // recursion terminator
//   if (!root) return root;
//   if (root === p || root === q) return root;
//   // drill down
//   let left = lowestCommonAncestor(root.left, p, q);
//   let right = lowestCommonAncestor(root.right, p, q);
//   // logic process
//   if (left && right) return root;
//   if (!left && !right) return null;
//   return !left ? right : left;
// };

var lowestCommonAncestor = function (root, p, q) {
  if (!root) return root;
  if (p === root || q === root) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  if (!left && !right) return null;
  return left ? left : right;
}
// @lc code=end

