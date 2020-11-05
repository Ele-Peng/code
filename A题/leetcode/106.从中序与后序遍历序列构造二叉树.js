/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// var buildTree = function(inorder, postorder) {
//   if (!inorder.length) return null;
//   let rootVal = postorder[postorder.length - 1]; // 根的值
//   let root = new TreeNode(rootVal);
//   let mid = inorder.indexOf(rootVal);
//   root.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid));
//   root.right = buildTree(inorder.slice(mid + 1), postorder.slice(mid, postorder.length - 1));
//   return root;
// };


var buildTree = function(inorder, postorder) {
  return buildTreeHelper(inorder, 0, inorder.length - 1,
    postorder, 0, postorder.length - 1);
};

var buildTreeHelper = function(inorder, inorderStartIndex, inorderEndIndex, 
  postorder, postOrderStartIndex, postOrderEndIndex) {
    // recursion terminator
    if (inorderStartIndex > inorderEndIndex || postOrderStartIndex > postOrderEndIndex) {
      return null;
    }

    // current level logic
    let target = postorder[postOrderEndIndex];
    let index = 0; // 中序遍历标志位索引值
    for (let i = inorderStartIndex; i <= inorderEndIndex; i ++) {
      if (inorder[i] === target) {
        index = i;
      }
    }
    let root = new TreeNode(target);
    let leftSize = index - inorderStartIndex;
    root.left = buildTreeHelper(inorder, inorderStartIndex, index - 1,
      postorder, postOrderStartIndex, postOrderStartIndex + leftSize - 1);
    root.right = buildTreeHelper(inorder, index + 1, inorderEndIndex,
      postorder, postOrderStartIndex + leftSize, postOrderEndIndex - 1);
    return root;
};
// @lc code=end

