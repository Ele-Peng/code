/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
var diameterOfBinaryTree = function(root) {
    let res = 1;
    const depth = (rootNode) => {
        if (!rootNode) return 0;
        let l = depth(rootNode.left);
        let r = depth(rootNode.right);
        res = Math.max(res, l + r + 1);
        return Math.max(l, r) + 1;
    }
    depth(root);
    return res - 1;
};
// @lc code=end

