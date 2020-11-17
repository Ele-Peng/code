// function bubbleSort(nums) {
//     if (!nums || !nums.length) return [];
//     for (let i = 0; i < nums.length; i ++) { // 大循环比较 nums.length 次数
//         for (let j = 0; j < nums.length - i - 1; j ++) { // 小循环冒泡数组最大的值
//             if (nums[j] > nums[j + 1]) {
//                 let temp = nums[j];
//                 nums[j] = nums[ j + 1];
//                 nums[j + 1] = temp;
//             }
//         }
//     }
//     return nums;
// }

// 优化：
// 如果经历 < nums.length 次，就已经有序了（不再进行冒泡）可以提前退出比较
function bubbleSort() {
    for (let i = 0; i < nums.length; i ++) {
        let complete = true;
        for (let j = 0; j < nums.length - i - 1; j ++) {
            if (nums[j] > nums[j + 1]) {
                let temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
                complete = false;
            }
        }
        if (complete) break;
    }
    return nums;
}

// bubbleSort([2,4,7,8,6,5,1,9]);