function main() {
  let arr = [2,4,7,8,6,5,1,9];
  heapSort(arr, arr.length);
  return arr;
}

function heapSort(nums, n) {
  buildHeap(nums, n);
  for (let i = n - 1; i >= 0; i--) {
    swap(nums, i, 0);
    heapify(nums, i, 0);
  }
}

function buildHeap(nums, n) {
  let lastIndex = n - 1;
  let lastParentIndex = (lastIndex - 1) >> 1;
  for (let i = lastParentIndex; i >= 0; i --) {
    heapify(nums, n, i);
  }
}

function heapify(nums, n, i) {
  if (i >= n) return ;
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

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}