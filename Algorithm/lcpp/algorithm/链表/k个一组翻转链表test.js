class ListNode{
    constructor(val, next){
        this.val = val;
        this.next = next;
    }
}

var reverseKGroup = function (head, k) {
  // 标兵
  let dummy = new ListNode();
  dummy.next = head;
  let [start, end] = [dummy, dummy.next];
  let count = 0;
  while (end) {
    count++;
    if (count % k === 0) {
      start = reverseList(start, end.next);
      end = start.next;
    } else {
      end = end.next;
    }
  }
  return dummy.next;




//链表的翻转过程，初始化一个为null的`previous node`，
//遍历链表的同时，当前node（cur）的下一个（next）指向前一个node（pre），
//在改变当前node的指向前，用一个临时变量记录当前node的下一个node（cur.next）
// 翻转stat -> end的链表
  function reverseList(start, end) {
    let [pre, cur] = [start, start.next];
    const first = cur;
    while (cur !== end) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    start.next = pre;
    first.next = cur;
    console.log(first)
    return cur;
  }
}
console.log(reverseKGroup(new ListNode(3, new ListNode(2, new ListNode(1, new ListNode(4, new ListNode(5))))), 2))

