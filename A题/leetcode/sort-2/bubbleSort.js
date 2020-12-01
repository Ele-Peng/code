function bubble(nums, n) {
  for (let i = 0; i < n - 1; i ++) {
    if (nums[i] > nums[i + 1]) {
      swap(nums, i, i + 1);
    }
  }
}

function bubbleSort(nums, n) {
  for (let i = 0; i < n; i ++) {
    bubble(nums, n - i);
    console.log(nums);
  }
}

function main() {
  let arr = [2,4,7,9,8,6,5,1];
  bubbleSort(arr, arr.length);
  return arr;
}

function swap(nums, i , j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}