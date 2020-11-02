/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
// var reverseKGroup = function(head, k) {
//   if (head == null) return head;
//   let a = head, b = head;
//   for (let i = 0; i < k; i ++) {
//     if (b == null) return head;
//     b = b.next;
//   }
//   let tempList = reverseFromAToB(a, b);
//   a.next = reverseKGroup(b, k);
//   return tempList;
// }

// function reverseFromAToB(a, b) {
//   let prev = null, cur = a, next = a;
//   while (cur !== b) {
//     next = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = next;
//   }
//   // 返回翻转后的 头结点
//   return prev;
// }



// var reverseKGroup = function(head, k) {
//   if (head === null) return head;
//   let a = head, b = head;
//   for (let i = 0; i < k; i ++) {
//     if (b == null) return head;
//     b = b.next;
//   }
//   let tempList = reverseFromAtoB(a, b);
//   a.next = reverseKGroup(b, k);
//   return tempList;
// }

// function reverseFromAtoB(a, b) {
//   let prev = null, cur = a, next = a;
//   while (cur !== b) {
//     next = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = next;
//   }
//   return prev;
// }

// 第三遍


var reverseKGroup = function(head, k) {
  // recursion terminator
  if (!head) return head;

  // current level logic
  let a = head, b = head;
  for (let i = 0; i < k ; i ++) {
    if (!b) return head;
    b = b.next;
  }
  let newHead = reverseAtoB(a, b);
  // drill down
  a.next = reverseKGroup(b, k);
  return newHead;
}

var reverseAtoB = function(a, b) {
  let prev = null, cur = a, next = a;
  while(cur !== b) {
    next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
// @lc code=end

