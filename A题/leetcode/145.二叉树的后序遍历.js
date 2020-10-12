/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
// 递归
// var postorderTraversal = function(root) {
//     const res = [];
//     postorderTraversalHelper(root, res);
//     return res;
// };

// var postorderTraversalHelper = function(root, res) {
//     if (!root) return root;
//     postorderTraversalHelper(root.left, res);
//     postorderTraversalHelper(root.right, res);
//     res.push(root.val);
// }


// 迭代

var postorderTraversal = function(root) {
    if (!root) return [];
    let res = [];
    let stack = [];
    let prev = null;
    while(root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (root.right === null || root.right == prev) { // 叶子结点 或者 右节点已经读取过了，即读取根结点（重新入栈）
            res.push(root.val);
            prev = root;
            root = null;
        } else {
            stack.push(root);
            root = root.right;
        }
    }
    return res;
};
// @lc code=end

