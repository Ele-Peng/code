/*
 * @lc app=leetcode.cn id=959 lang=javascript
 *
 * [959] 由斜杠划分区域
 */

// @lc code=start
/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function(grid) {
    const n = grid.length;
    const unionFind = new UnionFind(n);
    for (let i = 0; i < n; i ++) {
        unionFind.union(i, i + 1); // 上
        unionFind.union(i * (n + 1), (i + 1) * (n + 1)); // 左
        unionFind.union(i * (n + 1) + n, (i + 1) * (n + 1) + n); // 右
        unionFind.union(n * (n + 1) + i, n * (n + 1) + i + 1); // 下
    }
    for (let i = 0; i < n;i ++) {
        // console.log(grid[i].replace(" ", "*")); 会被转义
        for (let j = 0; j < n; j ++) {
            // console.log(grid[i][j], i, j);
            if (grid[i][j] === ' ') continue;
            let x = 0, y = 0;
            if (grid[i][j] == "/") {
                x = i * (n + 1) + (j + 1);
                y = (i + 1) * (n + 1) + j;
            } else {
                x = i * (n + 1) + j;
                y = (i + 1) * (n + 1) + 1 + j;
            }
            unionFind.union(x, y);
        }
    }
    return unionFind.count;
};

class UnionFind {
    constructor(n) {
        this.father = (new Array((n + 1) * (n + 1))).fill(0).map((item, index) => {
            return index;
        })
        this.count = 0;
    }

    getFather(x) {
        if (this.father[x] === x) return x;
        return this.father[x] = this.getFather(this.father[x]);
    }

    union(x, y) {
        const rootX = this.getFather(x), rootY = this.getFather(y);
        if (rootX !== rootY) {
            this.father[rootX] = rootY;
        } else {
            this.count = this.count + 1;
        }
    }
}
// @lc code=end

