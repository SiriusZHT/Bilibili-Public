// 304.至多包含K个不同字符的最长子串
// 给定一个字符串 找出 至多 包含k个不同字符的最长子串T

// 示例 1
// 输入: s = 'eceba', k = 2
// 输出: 3
// 解释：T为'ece', 所以长度为3

// 示例 2
// 输入: s = 'aa', k = 1
// 输出: 2
// 解释：T为'aa', 所以长度为2

function lengthOfLongestSubstringKDistinct(s, k) {
    let n = s.length, res = 0;
    const map = new Map();
    for(let i = 0, j = 0; j < n; j++) {
        ++map[s[j]];
        while(i < n && map.size > k) {
            --map[s[i]];
            map.get(s[i]) && map[s[i]] == 0 && map.delete(s[i]);
            ++i;
        }
        res = Math.max(res, j - i + 1);
    }
    return res;
}

console.log(lengthOfLongestSubstringKDistinct('eceba', 2))