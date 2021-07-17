function main() {
  let arr = [2,4,7,9,8,6,5,1];
  bubbleSort(arr, arr.length);
  return arr;
}


function bubbleSort(arr, len) {
  for (let i = 0; i < len; i ++) {
    bubble(arr, len - i);
  }
}

function bubble (arr, k) {
  console.log(arr);
  for (let i = 0; i < k - 1; i ++) {
    if (arr[i] > arr[i + 1]) {
      swap(arr, i, i + 1);
    }
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}