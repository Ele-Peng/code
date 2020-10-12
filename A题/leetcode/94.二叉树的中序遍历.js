/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = [];
    inorderTraversalHelper(root, res);
    return res;
};

var inorderTraversalHelper = function(root, res) {
    if (!root) return root;
    inorderTraversalHelper(root.left, res);
    res.push(root.val);
    inorderTraversalHelper(root.right, res);
}
// @lc code=end

