/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// var reverseBetween = function(head, m, n) {
//   if (m == 1) return reverseN(head, n);
//   head.next = reverseBetween(head.next, m - 1, n - 1);
//   return head;
// };

// // 反转链表前 N 个元素
// let p = null; // 记录第 N 节点
// function reverseN(head, n) {
//   if (n == 1) {
//     p = head.next;
//     return head;
//   }
//   let last = reverseN(head.next, n - 1);
//   head.next.next = head;
//   head.next = p;
//   return last;
// }
var reverseBetween = function(head, m, n) {
  let tail = null;
  var reverseN = function(head, n) {
    // recursion terminator
    if (!head || !head.next) return head;
    // current level logic
    if (n === 1) { // n 小于 链表长度
      tail = head.next;
      return head;
    }
    let next = head.next;
    let reverseHead = reverseN(next, n - 1);
    next.next = head;
    head.next = tail;
    return reverseHead;
  }
  if (m === 1) return reverseN(head, n);
  head.next = reverseBetween(head.next, m - 1, n - 1);
  return head;
};
// @lc code=end

