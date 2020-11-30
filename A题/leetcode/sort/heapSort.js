/**
 * 交换 nums 中两个节点
 * @param {*} nums 
 * @param {*} i 
 * @param {*} j 
 */
function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

/**
 * 调整堆
 * @param {*} nums 
 * @param {*} n nums 的节点数
 * @param {*} i 对 i 做 heapify 操作
 */
function heapify(nums, n, i) {
  if (i >= n) return ; // base case 防止数组越界
  let leftChild = 2 * i + 1;
  let rightChild = 2 * i + 2;
  let max = i;
  if (leftChild < n && nums[max] < nums[leftChild]) {
    max = leftChild;
  }
  if (rightChild < n && nums[max] < nums[rightChild]) {
    max = rightChild;
  }
  if (max !== i) {
    swap(nums, max, i);
    heapify(nums, n, max);
  }
}

/**
 * 构建堆
 * 从完全二叉树最后一个叶子节点的父节点开始递减构建
 * @param {*} nums 
 * @param {*} n 
 */
function buildHeap(nums, n) {
  let lastIndex = n - 1; // 最后一个叶子节点
  // parent = (i - 1) >> 1:
  let lastParentIndex = (lastIndex - 1) >> 1; // 父节点 for 最后一个叶子节点
  for (let i = lastParentIndex; i >= 0; i --) {
    heapify(nums, n, i);
  }
}

/**
 * 堆排序
 * @param {*} nums 
 * @param {*} n 
 */
function heapSort(nums, n) {
  buildHeap(nums, n);
  for (let i = n - 1; i >= 0; i --) {
    swap(nums, i, 0);
    heapify(nums, i, 0);
  }
}

function main() {
  let arr = [2,4,7,8,6,5,1,9];
  heapSort(arr, arr.length);
  return arr;
}