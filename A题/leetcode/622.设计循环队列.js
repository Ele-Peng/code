/*
 * @lc app=leetcode.cn id=622 lang=javascript
 *
 * [622] 设计循环队列
 */

// @lc code=start
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class MyCircularQueue {
  /**
   * Initialize your data structure here. Set the size of the queue to be k.
   * @param {number} k
   */
  constructor(k) {
    this.opacity = k; // 链表容量
    this.head = null; // 头指针
    this.tail = null; // 尾指针
    this.count = 0; // 当前链表
  }

  /**
   * Insert an element into the circular queue. Return true if the operation is successful. 
   * @param {number} value
   * @return {boolean}
   */
  enQueue(val) {
    if (this.isFull()) return false;
    let newNode = new Node(val);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.count ++;
    return true;
  }

  /**
   * Delete an element from the circular queue. Return true if the operation is successful.
   * @return {boolean}
   */
  deQueue() {
    if (this.isEmpty()) return false;
    this.head = this.head.next;
    this.count --;
    return true;
  }

  /**
   * Get the front item from the queue.
   * @return {number}
   */
  Front() {
    if (this.isEmpty()) return -1;
    return this.head.value;
  }

  /**
   * Get the last item from the queue.
   * @return {number}
   */
  Rear() {
    if (this.isEmpty()) return -1;
    return this.tail.value;
  }


  /**
   * Checks whether the circular queue is empty or not.
   * @return {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * Checks whether the circular queue is full or not.
   * @return {boolean}
   */
  isFull() {
    return this.count === this.opacity;
  }
}


/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
// @lc code=end

