/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// 递归
// var preorder = function(root) {
//   let res = [];
//   preorderHelper(root, res);
//   return res;
// };

// var preorderHelper = function(root, arr) {
//   if (!root) return root;
//   arr.push(root.val); // 修改 arr 引用
//   for (let i = 0; i < root.children.length; i ++) {
//     preorderHelper(root.children[i], arr);
//   }
// }

// 迭代 利用队列
var preorder = function(root) {
  if (!root) return [];
  let res = [root.val];
  let queue = [...root.children];
  while(queue.length) {
    let cur = queue.shift();
    res.push(cur.val);
    queue.unshift(...cur.children);
  }
  return res;
};
// @lc code=end

