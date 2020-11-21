function main() {
    let arr = [2,4,7,8,6,5,1,9];
    if (arr.length < 2) return arr;
    return qiuckSort(arr, 0, arr.length - 1);
}

// function qiuckSort(nums) {
//     if (nums.length < 2) return nums;
//     let left = [];
//     let right = [];
//     let target = nums[0];
//     for (let i = 1; i < nums.length; i ++) {
//         if (nums[i] > target) {
//             right.push(nums[i]);
//         } else {
//             left.push(nums[i]);
//         }
//     }
//     return qiuckSort(left).concat([target], qiuckSort(right));
// }

function qiuckSort(nums, start, end) {
    if (start > end) return ;
    let target = nums[start];
    let left = start;
    let right = end;
    while (left < right) {
        while (nums[left] < target) {
            left ++;
        }
        while (nums[right] > target) {
            right --;
        }
        swap(nums, left, right);
    }
    nums[left] = target;
    qiuckSort(nums, start, left - 1);
    qiuckSort(nums, left + 1, end);
    return nums;
}

function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}