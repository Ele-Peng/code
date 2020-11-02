/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// var connect = function(root) {
//   if (root == null) return null;
//   connectTwoNode(root.left, root.right);
//   return root;
// };

// function connectTwoNode(node1, node2) {
//   if (node1 == null || node2 == null) return null;
//   node1.next = node2;
//   connectTwoNode(node1.left, node1.right);
//   connectTwoNode(node2.left, node2.right);
//   connectTwoNode(node1.right, node2.left);
// }


var connect = function(root) {
  if (!root) return root;
  connectHelper(root.left, root.right);
  return root;
};

var connectHelper = function (node1, node2) {
  // recursion terminator
  if (!node1 || !node2) return null;

  // current level logic
  node1.next = node2;

  // dirll down
  // 相同父节点
  connectHelper(node1.left, node1.right);
  connectHelper(node2.left, node2.right);
  // 跨越父节点
  connectHelper(node1.right, node2.left);
}
// @lc code=end

