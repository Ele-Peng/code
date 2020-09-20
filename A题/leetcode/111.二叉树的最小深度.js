/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
var minDepth = function(root) {
  if (root == null) return 0;
  let ans = 1;
  let queue = [];
  queue.push(root);
  while(queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i ++) {
        let cur = queue.shift();
        if (!cur.left && !cur.right) return ans;
        if (cur.left != null) queue.push(cur.left);
        if (cur.right != null) queue.push(cur.right);
    }
    ans++;
  }
  return ans;
};
// @lc code=end

