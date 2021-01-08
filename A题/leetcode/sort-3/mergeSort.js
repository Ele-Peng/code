function main() {
  let arr = [2,4,7,8,6,5,1,9];
  mergeSort(arr, 0, arr.length - 1);
  return arr;
}

function mergeSort(nums, L, R) {
  if (L === R) return ;
  let M = (L + R) >> 1;
  mergeSort(nums, L, M);
  mergeSort(nums, M + 1, R);
  merge(nums, L, M + 1, R);
}

function merge(nums, L, M, R) {
  const LEFT_SIZE = M - L;
  const RIGHT_SIZE = R - M + 1;
  let left = new Array(LEFT_SIZE);
  let right = new Array(RIGHT_SIZE);

  for (let i = L; i < M; i ++) {
    left[i - L] = nums[i];
  }

  for (let i = M; i <= R; i ++) {
    right[i - M] = nums[i];
  }

  let i = 0, j = 0, k = L;
  while (i < LEFT_SIZE && j < RIGHT_SIZE) {
    if (left[i] < right[j]) {
      nums[k] = left[i];
      i ++;
      k ++;
    } else {
      nums[k] = right[j];
      j ++;
      k ++;
    }
  }

  while (i < LEFT_SIZE) {
    nums[k] = left[i];
    i ++;
    k ++;
  }

  while (j < RIGHT_SIZE) {
    nums[k] = right[j];
    j ++;
    k ++;
  }
}