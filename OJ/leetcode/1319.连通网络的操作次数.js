/*
 * @lc app=leetcode.cn id=1319 lang=javascript
 *
 * [1319] 连通网络的操作次数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    if (n > connections.length + 1) return  -1;

    let i = -1, unionFind = new UnionFind(n);
    while (++i < connections.length) {
        const x = connections[i][0], y = connections[i][1];
        unionFind.union(x, y);
    }
    return unionFind.count - 1;;
};

class UnionFind {
    constructor(n) {
        this.father = (new Array(n)).fill(0).map((item, index) => {
            return index;
        });
        this.count = n;
    }

    union(x, y) {
        const rootX = this.getFather(x), rootY = this.getFather(y);
        if (rootX !== rootY) {
            this.father[rootX] = rootY;
            this.count --;
        }
    }

    getFather(x) {
        if (x === this.father[x]) return x;
        return this.father[x] = this.getFather(this.father[x]);
    }
}
// @lc code=end

