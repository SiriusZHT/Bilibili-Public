class ListNode{
    constructor(val, next){
        this.val = val;
        this.next = next;
    }
}

function reverseKGroup(head, k){
    
    //标兵
    let dummy = new ListNode();
    dummy.next = head;
    let [start, end] = [dummy, dummy.next];
    let count = 0;
    while (end) {
        count++;
        if(count % k === 0){
            start = reverseList(start, end.next);
            end = start.next;
        } else {
            end = end.next;
        }
    }
    //返回头节点
    return dummy.next;

    function reverseList(start, end){
        let [pre, cur] = [start, start.next];
        const first = cur;
        while(cur !== end){
            let next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        start.next = pre;
        first.next = cur;
        return first;
    }
}

//测试
let a = new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null))))))
console.log(a)
console.log(reverseKGroup(a, 1))