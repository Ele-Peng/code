/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
var convertBST = function(root) {
  let sum = 0;
  var convertBSTHelper = function(root) {
    // recursion terminator
    if (!root) return root;
  
    // current level logic
    // 中序遍历顺序为 升序，我们只需要 将中序遍历反过来 就是 降序；
    convertBSTHelper(root.right);
    sum += root.val;
    root.val = sum;
    convertBSTHelper(root.left);
    return root;
  };
  return convertBSTHelper(root);
};
// @lc code=end

