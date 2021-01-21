/*
 * @lc app=leetcode.cn id=547 lang=javascript
 *
 * [547] 省份数量
 */

// @lc code=start
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    let i = -1, unionFind = new UnionFind(isConnected.length);
    while (++i < isConnected.length) {
        for (let j = i + 1; j < isConnected[i].length; j ++) {
            if (isConnected[i][j]) unionFind.union(i, j);
        }
    }
    return unionFind.father.filter((v, i) => v === i).length
};


class UnionFind {
    constructor(n) {
        this.father = (new Array(n)).fill(0).map((item, index) => {
            return index;
        })
    }

    union (x, y) {
        const rootX = this.find(x), rootY = this.find(y);
        if (rootX !== rootY) this.father[rootX] = rootY;
    }

    find (x) {
        if (this.father[x] === x) return x;
        return this.father[x] = this.find(this.father[x]);
    }
}


// @lc code=end

