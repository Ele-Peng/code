function main() {
  let arr = [2,4,7,8,6,5,1,9];
  selectionSort(arr, arr.length);
  return arr;
}

/**
 * 选择排序
 * 选择 [0, n] 中最大的 index 值，与最后一个 n - 1交换，保证从右至左由大到小排序
 * @param {*} nums 
 * @param {*} n 
 */
function selectionSort(nums, n) {
  while (n > 1) {
    let pos = findMaxIndex(nums, n);
    n --;
    swap(nums, pos, n);
  }
  // for (let i = 0; i < n; i ++) {
  //   let pos = findMaxIndex(nums, n - i);
  //   swap(nums, pos, n - i - 1);
  // }
}

function findMaxIndex(nums, n) {
  let max = nums[0];
  let pos = 0;
  for (let i = 1; i < n; i ++) {
    if (nums[i] > max) {
      max = nums[i];
      pos = i;
    }
  }
  return pos;
}

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}