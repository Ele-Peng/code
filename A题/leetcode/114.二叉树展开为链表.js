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
// var flatten = function(root) {
//   if (root == null) return root;
//   flatten(root.left);
//   flatten(root.right);

//   // 左右子树已经拉平成一条链表
//   let left = root.left;
//   let right = root.right;
//   // 当前右子树 等于 左子树
//   root.left = null;
//   root.right = left;

//   // 遍历当前右子树，将之前的右子树，挂到当前右子树上
//   let p = root;
//   while(p.right !== null) {
//     p = p.right;
//   }
//   p.right = right;
// };


var flatten = function(root) {
  if (!root) return root;
  flatten(root.left);
  flatten(root.right);

  // current level logic
  // 左右俩子树已经被拉平
  let left = root.left;
  let right = root.right;

  // 将左子树接到右子树，并将左子树置空
  root.right = left;
  root.left = null;

  // 将原先右子树接到当前右子树下面
  let pos = root; // 当前右子树遍历到最后一个节点，开始接入原先右子树
  while (pos.right) {
    pos = pos.right;
  }
  pos.right = right;

};
// @lc code=end

