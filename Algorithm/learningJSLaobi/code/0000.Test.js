const occ = new Set();
const n = s.length;
//右指针 初始值为-1 相当于在左边界 还没开始滑动
let rightKey = -1, ans = 0;
for(let leftKey = 0; leftKey < n; ++leftKey){
    //保证每次左指针滑动的时候 左指针左边的字符都被删完了
    if(leftKey != 0){
        occ.delete(s[leftKey - 1]);//删除它前面一个，等同于进位
    }
    for( ; rightKey + 1 < n && !occ.has(s.charAt(rightKey + 1)); ++rightKey) {
        // 不断地移动右指针
        occ.add(s.charAt(rightKey + 1));
    }
    // 第 leftKey 到 rightKey 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rightKey - leftKey + 1);
}