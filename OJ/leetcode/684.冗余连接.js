/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const graph = [];
    const visited = new Array(edges.length + 1);
    const d = x => {
        if (visited[x] >= 1) return visited[x] === 2;
        visited[x] = 1;
        for (let i = 0; i < graph[x].length; i ++) {
            if (d(graph[x][i])) return true;
        }
        visited[x] = 2;
    }

    for (let i = 0; i < edges.length; i ++) {
        const x = edges[i][0];
        const y = edges[i][1];
        if (!graph[x]) graph[x] = [];
        graph[x].push(y);
        if (!graph[y]) graph[y] = [];
        graph[y].push(x);
        if (d(x)) return [x, y];
        visited.fill(0);
    }
};
// @lc code=end

