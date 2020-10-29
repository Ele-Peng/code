/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let count = 0;
  let queue = [];
  for (let i = 0; i < grid.length; i ++) {
    for (let j = 0; j < grid[0].length; j ++) {
      if (grid[i][j] === '1') {
        count ++;
        grid[i][j] = '0';
        queue.push([i, j]);
        turnZero(queue, grid); // 沉岛
      }
    }
  }
  return count;
};
var turnZero = function(queue, grid) {
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  while(queue.length) {
    const curIsland = queue.shift();
    for (let direction of directions) {
      let x = curIsland[0] + direction[0]; // 探测x轴
      let y = curIsland[1] + direction[1]; // 探测y轴
      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== '1') {
        continue;
      }
      grid[x][y] = '0';
      queue.push([x, y]);
    }
  }
};


// @lc code=end

