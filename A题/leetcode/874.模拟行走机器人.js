/*
 * @lc app=leetcode.cn id=874 lang=javascript
 *
 * [874] 模拟行走机器人
 */

// @lc code=start
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]; // 二维数组表示方向
    const hashObstacles = new Set; // 障碍物
    for (let i = 0; i < obstacles.length; i ++) {
        hashObstacles.add(obstacles[i][0] + "-" + obstacles[i][1]);
    }
    // maxLengthSquare 欧式距离的平方
    // x , y 更新后的 x y 坐标
    // direction 当前方向
    let x = 0, y = 0, direction = 0, maxLengthSquare = 0;
    for (let i = 0; i < commands.length; i ++) {
        if (commands[i] === -2) {
            direction = (direction + 3) % 4; // 左转
        } else if (commands[i] === -1) {
            direction = (direction + 1) % 4; // 右转
        } else {
            let step = 0;
            while (step < commands[i] && !hashObstacles.has(
                Number(x + directions[direction][0]) + "-" + Number(y + directions[direction][1]) 
            )) {
                x += directions[direction][0];
                y += directions[direction][1];
                step ++;
            }
        }
        maxLengthSquare = Math.max(maxLengthSquare, x * x + y * y);
    }
    return maxLengthSquare;
};
// @lc code=end

