/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
// var invertTree = function(root) {
//   if (root == null) return null;
//   let tempNode = root.left;
//   root.left = root.right;
//   root.right = tempNode;
//   root.left = invertTree(root.left);
//   root.right = invertTree(root.right);
//   return root;
// };


// var invertTree = function(root) {
//   // recursion terminator
//   if (!root) return root;

//   // logic process
//   let temp = root.left;
//   root.left = root.right;
//   root.right = temp;

//   // drill down
//   root.left = invertTree(root.left);
//   root.right = invertTree(root.right);
//   return root;
// };


// 第三遍
var invertTree = function(root) {
  // recursion terminator
  if (!root) return root;

  // current level logic
  // swap two node
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  // drill down
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
// @lc code=end

