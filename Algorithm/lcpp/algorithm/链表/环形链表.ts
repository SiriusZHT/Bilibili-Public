import { nodeModuleNameResolver } from "typescript";
class ListNode {
  val: number;
  next: ListNode;
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

function detectCycle(head: ListNode) {
  //初始化
  let slow: ListNode = head;
  let fast: ListNode = head;
  let x = null;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast == slow) {
      x = fast;
      break;
    }
  }
  if (!x) {
    return null;
  }
  slow = head;
  while (slow != x) {
    slow = slow.next;
    x = x.next;
  }
  return slow;
}

// x表示第一个集合点
// 假设L是循环的起点和起点之间的长度。
// C是入口点与x之间的长度
// D是圆的其余部分。
// 2(L + C) = L + 2C + D
// so:L = D

// 因此，我们设置了两个指针，步长范围从一到两个。当两个指针相遇时，慢点再次从起点开始，快点继续。绝对可以在入口点见面，因为L = D
