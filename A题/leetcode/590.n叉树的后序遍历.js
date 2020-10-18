/*
 * @lc app=leetcode.cn id=590 lang=javascript
 *
 * [590] N叉树的后序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// 迭代 dfs
var postorder = function(root) {
    if (!root) return [];
    let stack = [root];
    let res = [];
    while (stack.length) {
        let cur = stack.pop();
        if (cur && cur.children.length) {
            stack.push(cur);
            for (let i = cur.children.length; i >= 0; i --) {
                stack.push(cur.children[i]);
            }
            cur.children = []; // 子节点全部遍历过了
        } else if (cur && (cur.val !== null)) {
            res.push(cur.val);
        }
    }
    return res;
};
// @lc code=end

