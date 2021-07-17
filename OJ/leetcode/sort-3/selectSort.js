function main() {
  let arr = [2,4,7,9,8,6,5,1];
  selectSort(arr, arr.length);
  return arr;
}

function selectSort(arr, len) {
  for (let i = 0; i < len - 1; i ++) {
    let pos = findMaxIndex(arr, len - i);
    swap(arr, pos, len - i - 1);
    console.log(arr);
  }
}

function findMaxIndex(arr, n) {
  let max = arr[0];
  let pos = 0;
  for (let i = 1; i < n; i ++) {
    if (arr[i] > max) {
      max = arr[i];
      pos = i;
    }
  }
  return pos;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}