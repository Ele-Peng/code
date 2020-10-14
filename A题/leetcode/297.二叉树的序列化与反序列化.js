/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

var serialize = function(root) {
  // recursion terminator
  if (!root) return "#,";

  let left = serialize(root.left);
  let right = serialize(root.right);

  // logic process
  return root.val + "," + left + right;
}


// const null_symbol = "#";

// var serialize = function(root) {
//   if (root === null) return null_symbol;
//   let str = [];
//   let queue = [];
//   queue.push(root);
//   while(queue && queue.length) {
//     let cur = queue.shift();
//     if (cur == null) {
//       str.push(null_symbol);
//       continue;
//     }
//     str.push(cur.val);
//     queue.push(cur.left);
//     queue.push(cur.right);
//   }
//   return str.toString();
// };
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
// var deserialize = function(data) {
//   if (data === null_symbol) return null;
//   let nodes = data.split(",");
//   let root = new TreeNode(parseInt(nodes[0], 10));
//   let queue = [];
//   queue.push(root);
//   for (let i = 1; i < nodes.length;) {
//     let parent = queue.shift();
//     let left = nodes[i ++];
//     if (left !== null_symbol) {
//       parent.left = new TreeNode(parseInt(left, 10));
//       queue.push(parent.left);
//     } else {
//       parent.left = null;
//     }
//     let right = nodes[i ++];
//     if (right !== null_symbol) {
//       parent.right = new TreeNode(parseInt(right, 10));
//       queue.push(parent.right);
//     } else {
//       parent.right = null;
//     }
//   }
//   return root;
// };


// 递归 前序遍历
var deserialize = function(data) {
  let arr = data.split(",");
  return deserializeHelper(arr);
}

var deserializeHelper = function(arr) {
  // recursion terminator
  let tempValue = arr.shift();
  if (tempValue === "#") {
    return null;
  }
  //  logic process
  let treeNode = new TreeNode;
  treeNode.val = tempValue;
  // drill down
  treeNode.left = deserializeHelper(arr);
  treeNode.right = deserializeHelper(arr);
  return treeNode;
}
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

