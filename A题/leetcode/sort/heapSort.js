/**
 * 堆排序
 * 时间复杂度 O(nlogn)
 * 不稳定
 * @param {*} nums 
 */
function heapSort(nums) {
  createHeap(nums);
  console.log(nums);
  for (let i = nums.length - 1; i > 0; i --) {
    [nums[i], nums[0]] = [nums[0], nums[i]];
    adjust(nums, 0, i);
  }
  return nums;
}

/**
 * 构建大顶堆
 * @param {*} nums 
 */
function createHeap(nums) {
  const len = nums.length;
  const start = (len >> 1) - 1;
  for (let i = start; i >= 0; i --) {
    adjust(nums, i, len);
  }
}

/**
 * 将第 target 元素进行下沉，孩子节点有比他大的就下沉
 * @param {*} nums 
 * @param {*} target 
 * @param {*} len 
 */
function adjust(nums, target, len) {
  for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
    // 找到孩子节点中最大的
    if (i + 1 < len && nums[i + 1] > nums[i]) {
      i = i + 1;
    }
    // 下沉
    if (nums[i] > nums[target]) {
      [nums[i], nums[target]] = [nums[target], nums[i]];
      target = i;
    } else {
      break;
    }
  }
}