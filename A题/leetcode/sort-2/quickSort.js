function quickSort(nums, start, end) {
  if (start > end) return;
  let left = start;
  let right = end;
  let target = nums[start];
  while(left < right) {
    while(nums[left] < target) {
      left ++;
    }
    while(nums[right] > target) {
      right --;
    }
    swap(nums, left, right);
  }
  nums[left] = target;
  quickSort(nums, start, left - 1);
  quickSort(nums, left + 1, end);
}

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function main() {
  let arr = [2,4,7,8,6,5,1,9];
  if (arr.length < 2)  return arr;
  quickSort(arr, 0, arr.length - 1);
  return arr;
}