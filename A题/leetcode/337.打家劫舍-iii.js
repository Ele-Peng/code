/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
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
var rob = function(root) {
  let memo = new Map;
  return robHelper(root, memo);
};
var robHelper = function(root, memo) {
  if (!root) return 0;
  if (memo.has(root)) return memo.get(root);
  let do_it = root.val + (
    !root.left ? 0 : robHelper(root.left.left, memo) + robHelper(root.left.right, memo)
  ) + (
    !root.right ? 0 : robHelper(root.right.left, memo) + robHelper(root.right.right, memo)
  )
  let not_do = robHelper(root.left, memo) + robHelper(root.right, memo);
  let res = Math.max(do_it, not_do);
  memo.set(root, res);
  return res;
}
// @lc code=end

