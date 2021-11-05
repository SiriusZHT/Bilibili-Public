"use strict";
// 142. Linked List Cycle II (Medium)
// 题目描述
// 给定一个链表 如果有环路 找出环路的开始点
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(val, next) {
        this.val = val == undefined ? null : val;
        this.next = next == undefined ? null : next;
    }
}
function detectCycle(head) {
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
