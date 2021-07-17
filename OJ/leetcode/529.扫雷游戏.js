/*
 * @lc app=leetcode.cn id=529 lang=javascript
 *
 * [529] 扫雷游戏
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
    const col = board.length;
    const row = board[0].length;

    const [clickX, clickY] = click;
    const queue = [click];
    if (board[clickX][clickY] === 'M') {
        board[clickX][clickY] = 'X';
    } else {
        bfs(col, row, board, queue);
    }
    return board;
};

var inBound = function(x, y, col, row) { // 是否在画布里
    return x >= 0 && x < col && y >= 0 && y < row;
};

var bfs = function(col, row, board, queue) {
    const directions = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ];

    while(queue.length) {
        const [x, y] = queue.shift();
        let count = 0; // 地雷数
        for (let direction of directions) { // 查找周边8个方位地雷数
            let tempX = x + direction[0];
            let tempY = y + direction[1];
            if (inBound(tempX, tempY, col, row) && board[tempX][tempY] === 'M') {
                count ++;
            }
        }
        if (count === 0) {
            board[x][y] = 'B';
            for (let direction of directions) {
                let tempX = x + direction[0];
                let tempY = y + direction[1];
                if (inBound(tempX, tempY, col, row) && board[tempX][tempY] === 'E') {
                    board[tempX][tempY] = 'B'; // 标记为非E的节点就好了，表示节点已经被访问过了
                    queue.push([tempX, tempY]);
                }
            }
        } else {
            board[x][y] = count + '';
        }
    }
};

// @lc code=end

