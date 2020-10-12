/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let res = [];
  levelOrderHelper(root, res);
  return res;
};
var levelOrderHelper = function(root, arr) {
  if (!root) return root;
  for (let)
  arr.push(root.val);
  levelOrderHelper(root.children, arr);
}
// @lc code=end

