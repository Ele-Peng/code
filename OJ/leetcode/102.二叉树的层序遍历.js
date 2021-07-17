/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 迭代 BFS
// var levelOrder = function(root) {
//     if (!root) return [];
//     let res = [];
//     let queue = [root];
//     while (queue.length) {
//         let level = [];
//         let len = queue.length;
//         for (let i = 0; i < len; i ++) {
//             let top = queue.shift(); // 取出队头元素
//             level.push(top.val);
//             if (top.left) {
//                 queue.push(top.left);
//             }
//             if (top.right) {
//                 queue.push(top.right);
//             }
//         }
//         res.push(level);
//     }
//     return res;
// };


var levelOrder = function(root) {
    if (!root) return [];
    let res = [];
    let level = 0;
    levelOrderHelper(root, res, level);
    return res;
};
var levelOrderHelper = function(root, res, level) {
    
    // recursion terminator
    if (!root) return ;
    // current level logic 
    res[level] ? res[level].push(root.val) : res[level] = [root.val];
    // drill down
    root.left && levelOrderHelper(root.left, res, level + 1);
    root.right && levelOrderHelper(root.right, res, level + 1);
};
// @lc code=end

