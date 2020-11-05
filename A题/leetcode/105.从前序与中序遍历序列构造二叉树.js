/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// var buildTree = function(preorder, inorder) {
//   if (inorder.length === 0) return null;
//   let rootVal = preorder[0]; // 根的值
//   const root = new TreeNode(rootVal); // 根节点
//   const mid = inorder.indexOf(rootVal); // 根所在位置
//   root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
//   root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
//   return root;
// };


var buildTree = function(preorder, inorder) {
  return buildTreeHelper(preorder, 0, preorder.length - 1,
    inorder, 0, inorder.length - 1);
};

var buildTreeHelper = function(preorder, preStartIndex, preEndIndex, inorder, inorderStartIndex, inorderEndIndex) {
  // recursion terminator
  if (preStartIndex > preEndIndex || inorderStartIndex > inorderEndIndex) {
    return null;
  }

  // current level logic
  let target = preorder[preStartIndex];
  // 找到在中序遍历中的 标志位
  let index = -1;
  for (let i = inorderStartIndex; i <= inorderEndIndex; i ++) {
    if (inorder[i] === target) {
      index = i;
    }
  }
  // 找到前序遍历 左子树个数 右子树个数
  let leftSize = index - inorderStartIndex;
  let root = new TreeNode(preorder[preStartIndex]);
  root.left = buildTreeHelper(preorder, preStartIndex + 1, preStartIndex + leftSize,
    inorder, inorderStartIndex, index - 1);
  root.right = buildTreeHelper(preorder,  preStartIndex + leftSize + 1, preEndIndex,
    inorder, index + 1, inorderEndIndex);
  return root;
};
// @lc code=end

