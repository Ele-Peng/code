/*
 * @lc app=leetcode.cn id=127 lang=javascript
 *
 * [127] 单词接龙
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    if (!endWord || wordList.indexOf(endWord) === -1) return 0;
    const comboDicts = {}
    const len = beginWord.length;
    // wordList 每个单词对应 例 abc *bc a*c ab*
    for (let i = 0; i < wordList.length; i ++) {
        for (let j = 0; j < len; j ++) {
            const newWord = wordList[i].substring(0, j) + "*" + wordList[i].substring(j + 1, len);
            comboDicts[newWord] ? comboDicts[newWord].push(wordList[i]) : comboDicts[newWord] = [wordList[i]];
        }
    }

    // BFS
    const queue = [[beginWord, 1]];
    const visited = {beginWord: true};

    while (queue.length) {
        const curNode = queue.shift();
        const curWord = curNode[0];
        const curLevel = curNode[1];

        for (let i = 0; i < len; i ++) {
            let newWord = curWord.substring(0, i) + "*" + curWord.substring(i + 1, len);
            if (newWord in comboDicts) {
                let tmpWords = comboDicts[newWord];
                for (let j = 0; j < tmpWords.length; j ++) {
                    if (tmpWords[j] === endWord) {
                        return curLevel + 1;
                    }
                    if (!visited[tmpWords[j]]) {
                        visited[tmpWords[j]] = true;
                        queue.push([tmpWords[j], curLevel + 1])
                    }
                }
            }
        }
    }
    return 0;
};
// @lc code=end

