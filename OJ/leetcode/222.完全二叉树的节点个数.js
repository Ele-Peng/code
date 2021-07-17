/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
 * @return {number}
 */
var countNodes = function(root) {
    let l = root, r = root;
    let hl = 0, hr = 0;
    while (l !== null) {
        l = l.left;
        hl ++;
    }
    while (r !== null) {
        r = r.right;
        hr ++;
    }
    if (hl === hr) {
        return Math.pow(2, hl) - 1;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
};
// @lc code=end

