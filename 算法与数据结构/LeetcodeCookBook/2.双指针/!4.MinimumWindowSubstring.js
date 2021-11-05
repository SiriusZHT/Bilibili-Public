// 76. Minimum Window Substring (Hard)
// 题目描述
// 给定两个字符串S和T，求S中包含T所有字符的最短连续字符串的长度
// 同时要求时间复杂度不超过O(n)
// 输入输出样例
// 输入是两个字符串S和T，输出是一个S字符串的子串
// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC" 在这个样例中，S 中同时包含一个 A、一个 B、一个 C 的最短子字符串是“BANC” 。
function minWindow(S='', T='') {
    // 每个字符是否在T中存在
    let flags = {};
    // 每个字符的缺少数量
    let chars = {};

    for(let i = 0; i < T.length; i++) {
        flags[T[i]] = true;
        chars[T[i]] = !chars[T[i]] == 1 ? 1 : ++chars[T[i]];
    }
    console.log(flags);
    console.log(chars);
    
    let [count, l, minL, minSize] = [0, 0, 0, S.length + 1];
    for(let r = 0; r < S.length; ++r) {
        if(flags[S[r]]){
            if(--chars[S[r]] >= 0){
                ++count;
            }
            while(count == T.length){
                if(r - l + 1 < minSize){
                    minL = l;
                    minSize = r - l + 1;
                }
                if(flags[S[l]] && ++chars[S[l]] > 0){
                    --count;
                }
                ++l;
            }
        }
    }
    return minSize > S.length ? "" : S.substring(minL, minSize);
}
console.log(minWindow("ADOBECODEBANC", "ABC"));
