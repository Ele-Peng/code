function main() {
    let arr = [2,4,7,8,6,5,1,9];
    return qiuckSort(arr, arr.length);
}

function qiuckSort(nums) {
    if (nums.length < 2) return nums;
    let left = [];
    let right = [];
    let target = nums[0];
    for (let i = 1; i < nums.length; i ++) {
        if (nums[i] > target) {
            right.push(nums[i]);
        } else {
            left.push(nums[i]);
        }
    }
    return qiuckSort(left).concat([target], qiuckSort(right));
}