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


const null_symbol = "#";

var serialize = function(root) {
    if (root == null) return null_symbol;
    let str = [];
    str = serializeHelper(root, str) || [];
    return str.toString();
};

function serializeHelper(root, str) {
  if (root === null) {
    str.push(null_symbol);
    return ;
  }
  str.push(root.val);
  serializeHelper(root.left, str);
  serializeHelper(root.right, str);
  return str;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let nodes = data.split(",");
    return deserializeHelper(nodes);
};

function deserializeHelper(nodes) {
  if ((nodes && !nodes.length) || (nodes == null)) return null;
  let first = nodes.shift();
  if (first == null_symbol) return null;
  let root = new TreeNode(parseInt(first, 10));
  root.left = deserializeHelper(nodes);
  root.right = deserializeHelper(nodes);
  return root;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

