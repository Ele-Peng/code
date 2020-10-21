/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const board = new Array(n);
    for (let i = 0; i < n; i ++) { // 初始化棋盘
        board[i] = new Array(n).fill('.');
    }
    const res = [];
    solveNQueensHelper(0, n, res, board);
    return res;
};


/**
 * 
 * @param {*} row 当前行
 * @param {*} n 棋盘大小
 * @param {*} res 结果集
 * @param {*} board 棋盘
 */
var solveNQueensHelper = function(row, n, res, board) {
    if (row === n) {
        const stringBoard = board.slice(); // 拷贝一份board
        for (let i = 0; i < n; i ++) {
            stringBoard[i] = stringBoard[i].join('');
        }
        res.push(stringBoard);
        return
    }
    for (let col = 0; col < n; col ++) { // 枚举出所有选择
        if (isValid(row, col, n, board)) { // 特判不合理的皇后情况
            board[row][col] = "Q"; // 做出选择，放置皇后
            solveNQueensHelper(row + 1, n, res, board); // 继续选择，往下递归
            board[row][col] = "."; // 撤销当前选择
        }
    }
};


var isValid = function(row, col, n, board) {
    for (let i = 0; i < row; i ++) { // 之前的行
        for (let j = 0; j < n; j ++) { // 所有的列
            if (board[i][j] === 'Q' && // 发现皇后，并且和自己同列/同对角线 正对角线，
                (j === col || i + j === row + col || i - j === row - col)    
            ) {
                return false; // 不是合法的选择
            }
        }
    }
    return true;
};
// @lc code=end

