### [140\. 单词拆分 II](https://leetcode-cn.com/problems/word-break-ii/)

Difficulty: **困难**

给定一个**非空**字符串 _s_ 和一个包含**非空**单词列表的字典 _wordDict_，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

**说明：**

- 分隔时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。

**示例 1：**

```
输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
输出:
[
  "cats and dog",
  "cat sand dog"
]
```

**示例 2：**

```
输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
解释: 注意你可以重复使用字典中的单词。
```

**示例  3：**

```
输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
输出:
[]
```

#### Solution

Language: javascript

> BT + temp 的解法

```javascript
​/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
    const res = [];
    function backTrack(temp, start) {
        if(start === s.length) {
            res.push(temp.join(" "));
            return;
        }
        for(let i = start + 1; i <= s.length; i++) {
            let str = s.substring(start, i);
            if(wordDict.indexOf(str) === -1) continue;
            temp.push(str);
            // 上面的 i 是左闭右开的，我们当前取不到 i，那下一次就是 i
            backTrack(temp, i);
            temp.pop();
        }
    }
    backTrack([], 0);
    return res;
};
```

> BT + DFS 的解法

```javascript
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  function backTrack(s, wordDict, start) {
    const res = [];
    for (let i = start + 1; i <= s.length; i++) {
      //如果拆解的子串不存在于字典中，就继续拆
      let str = s.substring(start, i);
      if (wordDict.indexOf(str) === -1) {
        continue;
      }
      //走到下面这个地方，说明拆分的子串str存在于字典中
      //如果正好拆完了，我们直接把最后一个子串添加到res中返回
      if (i === s.length) {
        res.push(str);
      } else {
        //如果没有拆完，我们对剩下的子串继续拆分
        //然后用当前的子串str和剩下的子串进行拼接（注意如果剩下的子串不能
        //完全拆分，remainRes就会为空，就不会进行拼接）
        const remainRes = backTrack(s, wordDict, i);
        for (let remainStr of remainRes) {
          res.push(str + " " + remainStr);
        }
      }
    }
    return res;
  }
  return backTrack(s, wordDict, 0);
};
```
