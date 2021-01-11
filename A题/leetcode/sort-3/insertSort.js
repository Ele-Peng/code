function insert(nums, n) {
  let key = nums[n];
  let i = n;
  while (nums[i - 1] > key) {
    nums[i] = nums[i - 1];
    i --;
    if (i === 0) break;
  }
  nums[i] = key;
}

function insertSort(nums, n) {
  for (let i = 1; i < n; i ++) {
    insert(nums, n);
  }
}

function main() {
  let arr = [2,4,7,8,6,5,1,9];
  insertionSort(arr, arr.length);
  return arr;
}