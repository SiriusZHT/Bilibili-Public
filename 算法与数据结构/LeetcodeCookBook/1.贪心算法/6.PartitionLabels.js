// 763. Partition Labels (Medium)
// 题目描述
// 把字符串分为尽可能多的片段，同一字母最多出现在一个片段中，返回一个表示每一个字符串片段的长度的列表

// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。

// 想切割，要有首尾两个指针，确定了结尾指针，就能确定下一个切割的开始指针。
// 遍历字符串，如果已扫描部分的所有字符，都只出现在已扫描的范围内，即可做切割。
// 怎么判断 所有字符都在扫描范围内？ 如果这个扫描范围 >= 已扫描字符的 最大的结束位置
// 怎么[start, end]切割 
// start 表示待切割的起始位置 end 表示所有字符都在扫描范围内的时候（已到达「已扫描的字符的最远位置」） 左闭右闭
// end直接可以用当前遍历的index来代替

const partitionLabels = (S) => {
  const maxPos = {};
  for (let i = 0; i < S.length; i++) { // 存放字母与它的最远位置
    maxPos[S[i]] = i;
  }

  const res = [];
  let start = 0;                        // 待切割的起始位置
  let scannedCharMaxPos = 0;            // 已扫描的字符中最远的位置

  for (let i = 0; i < S.length; i++) {
    const curCharMaxPos = maxPos[S[i]]; // 当前扫描的字符的最远位置
    scannedCharMaxPos = Math.max(scannedCharMaxPos, curCharMaxPos); // 更新「已扫描的字符中最远的位置」
    if (i == scannedCharMaxPos) { // 正好扫描到「已扫描的字符的最远位置」，到达切割点
      res.push(i - start + 1);
      start = i + 1;              // 更新，下一个待切割的字符串的起始位置
    }
  }
  return res;
};

console.log(partitionLabels('ababcbacadefegdehijhklij'))

        