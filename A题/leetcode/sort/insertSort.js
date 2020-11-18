/**
 * 插入排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * @param {*} nums 
 */
function insertSort(nums) {
  for (let j = 1; j < nums.length; j ++) {
    let temp = nums[j];
    for (let i = j - 1; i >= 0; i --) {
      if (nums[i] > temp) {
        nums[i + 1] = nums[i];
        nums[i] = temp;
      } else {
        nums[i] = nums[i];
        nums[i + 1] = temp;
        break;
      }
    }
  }
  return nums;
}
// [2,4,7,8,6,5,1,9]
// insertSort([2,4,7,8,6,5,1,9])