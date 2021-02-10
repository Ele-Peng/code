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
    return unionFind.count;
};


class UnionFind {
    constructor (n) {
        this.count = n; // 连通量个数
        this.father = (new Array(n)).fill(0).map((item, index) => {
            return index;
        }); // 存储一棵树
        this.size = (new Array(n)).fill(0).map((item, index) => {
            return index;
        }); // 树的重量
    }

    union (x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX === rootY) {
            return ;
        }
        // 小树接到大树下
        if (this.size[rootX] > this.size[rootY]) {
            this.father[rootX] = rootY;
            this.size[rootX] += this.size[rootY];
        } else {
            this.father[rootY] = rootX;
            this.size[rootY] += this.size[rootX];
        }
        this.count --;
    }

    // 判断两个是否联通
    connected (x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        return rootX === rootY;
    }

    find (x) {
        if (this.father[x] === x) return x;
        return this.father[x] = this.find(this.father[x]);
    }
}


// @lc code=end

