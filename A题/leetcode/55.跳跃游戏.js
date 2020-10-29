/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    const memoryStack = new Array(nums.length);
    memoryStack[nums.length - 1] = true;
    const dfs = (level, nums) => {
        // recursion terminator
        if (memoryStack[level] !== void 0) { // 跳跃到数组的最后一个位置
            return memoryStack[level];
        }

        // current level logic
        let canJumpSteps = Math.min(level + nums[level], nums.length - 1); // 能跳跃的最远距离不能超过数组长度，且大于等于本位置至本位置索引的最大长度
        // drill down
        for (let i = level + 1; i <= canJumpSteps; i ++) {
            if (dfs(i, nums)) {
                memoryStack[level] = true;
                return true;
            }
        }
        memoryStack[level] = false;
        return false;
    }
    return dfs(0, nums);
};
// @lc code=end

