// 524. 通过删除字母匹配到字典里最长单词(Medium)
// 给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。
// 如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

// 示例 1:
// 输入:
// s = "abpcplea", d = ["ale","apple","monkey","plea"]
// 输出: 
// "apple"

// 示例 2:
// 输入:
// s = "abpcplea", d = ["a","b","c"]
// 输出: 
// "a"
function checkSub(s, dictionary){
    let i = j = 0;
    while(i < s.length && j < dictionary.length){
        s[i] == dictionary[j] && ++j;
    }
    return j == dictionary.length;
}

function temp(a, b){
    if(a.length == b.length){
        return a - b;
    }else{
        return b.length - a.length;
    }
}
function findLongestWord(s, dictionary){
    dictionary.sort(temp);
    for(let i = 0; i < dictionary.length; i++){
        if(checkSub(s, dictionary[i])){
            return dictionary[i];
        }
    }
    return "";
}