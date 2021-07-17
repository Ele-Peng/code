/*
 * @lc app=leetcode.cn id=126 lang=javascript
 *
 * [126] 单词接龙 II
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  wordSet.add(beginWord);
  if (!wordSet.has(endWord)) return [];

  const levelMap = new Map; // 当前层所拥有的单词
  const wordMap = new Map; // 存放图中单词的邻接单词

  // BFS template
  const visited = new Set;
  const queue = [beginWord];
  visited.add(beginWord);

  let finished = false; // 是否存在变化到终点词的路径
  let level = 0; // 当前层索引
  levelMap.set(beginWord, level);

  while(queue.length) {
    const levelSize = queue.length; // 当前层的单词个数
    level ++;
    
    for (let i = 0; i < levelSize; i ++) {
      const word = queue.shift();

      for (let j = 0; j < word.length; j ++) {
        for (let c = 97; c <= 122; c ++) {
          const newWord = word.slice(0, j) + String.fromCharCode(c) + word.slice(j + 1);
          if (!wordSet.has(newWord)) continue; // wordlist 不存在则继续查找
          if (wordMap.has(newWord)) {
            if (wordMap.get(newWord).findIndex(i => i === word) === -1) {
              wordMap.get(newWord).push(word);
            }
          } else {
            wordMap.set(newWord, [word]);
          }

          if (visited.has(newWord)) continue; // 该新单词已经访问过
          if (newWord === endWord) {
            finished = true;
          }
          levelMap.set(newWord, level); // 记录这个单词所在 level
          queue.push(newWord);
          visited.add(newWord);
        }
      }
    }
  }

  if (!finished) return [];

  const res = [];
  const path = [];
  dfs(path, beginWord, endWord, res, wordMap, levelMap);
  return res;
};

// dfs template
function dfs(path, beginWord, word, res, wordMap, levelMap) {
  if (beginWord === word) { // 从结果开始往起始词回溯
    res.push([beginWord, ...path]);
    return ;
  }

  path.unshift(word); // 将当前单词加入到 path 数组开头
  if (wordMap.get(word)) {
    for (const parent of wordMap.get(word)) {
      if (levelMap.get(parent) + 1 === levelMap.get(word)) {
        dfs(path, beginWord, parent, res, wordMap, levelMap);
      }
    }
  }
  path.shift(); // 撤销选择
}
// @lc code=end

