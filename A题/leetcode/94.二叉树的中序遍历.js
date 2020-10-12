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
// 递归
// var inorderTraversal = function(root) {
//     const res = [];
//     inorderTraversalHelper(root, res);
//     return res;
// };

// var inorderTraversalHelper = function(root, res) {
//     if (!root) return root;
//     inorderTraversalHelper(root.left, res);
//     res.push(root.val);
//     inorderTraversalHelper(root.right, res);
// }


// 迭代

var inorderTraversal = function(root) {
    if (!root) return [];
    let res = [];
    let stack = [];
    while(root || stack.length) {
        while(root) {
            stack.push(root); // stack 后进先出
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};

// @lc code=end

