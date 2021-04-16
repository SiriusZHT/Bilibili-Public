// 142. Linked List Cycle II (Medium)
// 题目描述
// 给定一个链表 如果有环路 找出环路的开始点

// 输入输出
// 输入是一个链表，输出是链表的一个节点。如果没有环路，返回一个空指针。
import { nodeModuleNameResolver } from "typescript";
class ListNode {
  val: any;
  next: ListNode | null;
  constructor(val?: any, next?: ListNode) {
    this.val = val == undefined ? null : val;
    this.next = next == undefined ? null : next;
  }
}

// 思路
// a：环外的长度
// b：slow走了b的距离 与 a 相遇
// c：slow走剩下的长度 = 圈的总长度 - b
// fast已经走完了环的n圈 因此走过的总距离：a + n(b+c) + b = a + (n+1)b + nc
// 因为fast比slow走快2倍
// 所以a + (n+1)b + nc = 2(a+b) => a = c + (n-1)(b+c)
// 就会发现：从相遇点 到 入环点 的距离 + n-1圈 的环长 == 链表头部 到 入环点的距离
// 当slow和fast相遇时 再额外用一个指针ptr 指向链表头部 然后跟slow每次移动一个位置 就能在入环点相遇
type pointType = {
  next: any;
};
function detectCycle(head: pointType) {
  let [slow, fast] = [head, head];
  // 判断是否存在环路
  do {
    // 如果fast或者fast的下一位到尽头了 也就是说 当前fast是尽头 或者 fast的下一个fast是尽头
    // 没有环路
    if (!fast || !fast.next) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
  } while (fast != slow);
  // 如果存在 查找环路节点
  let ptr = head;
  while (ptr != slow) {
    console.log(slow);
    slow = slow.next;
    ptr = ptr.next;
  }
  return ptr;
}

const head = new ListNode(3);
// 环路
const node1 = new ListNode(2);
const node2 = new ListNode(0);
const node3 = new ListNode(-4);
head.next = node1;
node1.next = node2;
node2.next = node3;
// 环路
node3.next = node1;
console.log(detectCycle(head));
