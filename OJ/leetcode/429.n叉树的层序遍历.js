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
// 层序遍历递归
// var levelOrder = function(root) {
//   if (!root) return [];
//   const res = [];
//   levelOrderHelper([root], res, 0);
//   return res;
// };
// var levelOrderHelper = function(nodes, res, level) {
//   if (!nodes.length) return nodes;
//   if (!res[level]) res[level] = [];
//   const childNodes = [];
//   nodes.forEach(element => {
//     res[level].push(element.val);
//     childNodes.push(...element.children);
//   });
//   levelOrderHelper(childNodes, res, level += 1);
// }

// 层序遍历迭代

var levelOrder = function(root) {
  if (!root) return [];
  let res = [];
  root.level = 0;
  let stack = [root];
  while(stack.length) {
    const node = stack.pop();
    if (!res[node.level]) res[node.level] = [];
    res[node.level].push(node.val);
    if (node.children) {
      for (let i =  node.children.length - 1; i >= 0; i --) {
        node.children[i].level = node.level + 1;
        stack.push(node.children[i]);
      }
    }
  }
  return res;
};
// @lc code=end

