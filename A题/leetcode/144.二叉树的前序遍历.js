/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function(root) {
    const res = [];
    preorderTraversalHelper(root, res);
    return res;
};

var preorderTraversalHelper = function(root, res) {
    if (!root) return root;
    res.push(root.val);
    preorderTraversalHelper(root.left, res);
    preorderTraversalHelper(root.right, res);
}
// @lc code=end

