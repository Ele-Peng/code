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
// var preorderTraversal = function(root) {
//     const res = [];
//     preorderTraversalHelper(root, res);
//     return res;
// };

// var preorderTraversalHelper = function(root, res) {
//     if (!root) return root;
//     res.push(root.val);
//     preorderTraversalHelper(root.left, res);
//     preorderTraversalHelper(root.right, res);
// }

// 迭代
// var preorderTraversal = function(root) {
//     if (!root) return [];
//     let res = [];
//     let queue = [root];
//     while(queue.length) {
//         let queueTop = queue.shift();
//         res.push(queueTop.val);
//         queueTop.right && queue.unshift(queueTop.right);
//         queueTop.left && queue.unshift(queueTop.left);
//     }
//     return res;
// };

// 迭代-DFS
var preorderTraversal = function(root) {
    let res = [];
    let stack = [root];
    while (stack.length) {
        let cur = stack.pop();
        res.push(cur.val);
        if (cur.left) {
            stack.push(cur.left);
        }
        if (cur.right) {
            stack.push(cur.right);
        }
    }
    return res;
};
// @lc code=end

