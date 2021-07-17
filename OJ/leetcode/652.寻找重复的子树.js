/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
  const resultMap = {};
  const res = [];
  serialized(root, resultMap, res);
  return res;
};

// 序列化
var serialized = function(root, subTreeMap, res) {
  // recursion terminator
  if (!root) {
    return "#";
  }
  // drill dowll
  const left = serialized(root.left, subTreeMap, res);
  const right = serialized(root.right, subTreeMap, res);

  // current level logic
  let subTree = left + ',' + right + ',' + root.val;
  if (!subTreeMap[subTree]) {
    subTreeMap[subTree] = 1;
  } else {
    subTreeMap[subTree] ++;
    if (subTreeMap[subTree] === 2) {
      res.push(root);
    }
  }
  return subTree;
};
// [0,0,0,0,null,null,0,null,null,null,0]
// @lc code=end

