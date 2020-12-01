function findMinIndex(nums, n) {
  let max = nums[0];
  let pos = 0;
  for (let i = 1;i < n; i ++) {
    if (nums[i] > max) {
      max = nums[i];
      pos = i;
    }
  }
  return pos;
}


function selectionSort(nums, n) {
  for (let i = 0; i < n; i ++) {
    let pos = findMinIndex(nums, n - i);
    swap(nums, pos, n - i - 1);
    console.log(nums);
  }
}

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}


function main() {
  let arr = [2,4,7,9,8,6,5,1];
  selectionSort(arr, arr.length);
  return arr;
}

