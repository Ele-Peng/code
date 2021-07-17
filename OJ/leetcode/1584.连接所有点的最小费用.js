/*
 * @lc app=leetcode.cn id=1584 lang=javascript
 *
 * [1584] 连接所有点的最小费用
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let len = points.length;
    const edges = [];
    for (let i = 0; i < len; i ++) {
        for (let j = i + 1; j < len; j ++) {
            const [xi, yi] = points[i];
            const [xj, yj] = points[j];
            edges.push([i, j, Math.abs(xj - xi) + Math.abs(yj - yi)])
        }
    }
    return UF(len, edges);
};

function UF(len, edges) {
    const edgesTemp = edges.sort((a, b) => {
        return a[2] - b[2];
    });
    const father = (new Array(len)).fill(0).map((item, index) => {
        return index;
    });
    let res = 0;
    // get Father
    const getFather = (x) => {
        if (father[x] === x) return x;
        return father[x] = getFather(father[x]);
    }
    // 这里是点x点y，对应上面的points的索引
    for (const [x, y, val] of edgesTemp) {
        const parent_x = getFather(x);
        const parent_y = getFather(y);
        if (parent_x !== parent_y) {
            father[parent_x] = parent_y;
            res += val;
        }
    }
    return res;
}
// @lc code=end

