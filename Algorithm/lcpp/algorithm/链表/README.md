# 基本操作

## 初始化

```js
interface ListNode<T> {
  data: T;
  next: ListNode<T>;
}
```

## 插入

> 插入只需要考虑要插入位置前驱节点和后继节点（双向链表的情况下需要更新后继节点）即可，其他节点不受影响

> 因此在给定指针的情况下插入的操作时间复杂度为 O(1)。这里给定指针中的指针指的是插入位置的前驱节点。

```javascript
temp = 待插入位置的前驱节点.next;
待插入位置的前驱节点.next = 待插入指针;
待插入指针.next = temp;
```

## 删除

> 只需要将需要删除的节点的前驱指针的 next 指针修正为其下下个节点即可，注意考虑边界条件。

```js
待删除位置的前驱节点.next = 待删除位置的前驱节点.next.next;
```

## 遍历

```js
当前指针 =  头指针
while 当前节点不为空 {
   print(当前节点)
   当前指针 = 当前指针.next
}
```

```javascript
dfs(cur) {
    if 当前节点为空 return
    print(cur.val)
    return dfs(cur.next)
}
```

# 链表和数组差异

- 数组的遍历：

```javascript
for(int i = 0; i < arr.size();i++) {
    print(arr[i])
}
```

- 链表的遍历：

```js
for (ListNode cur = head; cur != null; cur = cur.next) {
    print(cur.val)
}
```

    数组是索引 ++
    链表是 cur = cur.next

- 逆序遍历

数组

```javascript
for(int i = arr.size() - 1; i > - 1;i--) {
    print(arr[i])
}
```

链表

```javascript
for (ListNode cur = tail; cur != null; cur = cur.pre) {
    print(cur.val)
}
```

- 添加元素
  `arr.push(1)`

```javascript
 public class ListNode {
      int val;
      ListNode next;
      ListNode() {}
      ListNode(int val) { this.val = val; }
      ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 }
```

```javascript
// 假设 tail 是链表的尾部节点
tail.next = new ListNode("lucifer");
tail = tail.next;
```

经过上面两行代码之后， tail 仍然指向尾部节点。

数组的底层也是类似的

```javascript
arr.length += 1;
arr[arr.length - 1] = "lucifer";
```

# 两个考点

## 指针的修改

- 头尾不断交换

数组

```javascript
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
  return arr;
}
```

链表

```javascript
function reverse(head, tail, terminal) {
  let cur = head;
  let pre = null;
  while (cur != terminal) {
    //留下next联系方式
    next = cur.next;
    //修改指针
    cur.next = pre;
    //继续往下走
    pre = cur;
    cur = next;
    return [tail, head];
  }
}
```

# 三个注意

## 出现了环，造成死循环。

- 题目就有可能环，让你判断是否有环，以及环的位置。
  - 快慢指针算法。
- 题目链表没环，但是被你操作指针整出环了。

## 分不清边界，导致边界条件出错。

- 如果题目的头节点可能被移除，那么考虑使用虚拟节点，这样头节点就变成了中间节点，就不需要为头节点做特殊判断了。
- 题目让你返回的不是原本的头节点，而是尾部节点或者其他中间节点，这个时候要注意指针的变化。

## 搞不懂递归怎么做

- 反转链表的前序遍历
- 尾递归

```python
def dfs(head, pre):
    if not head: return pre
    # 留下联系方式（由于后面的都没处理，因此可以通过 head.next 定位到下一个）
    next = head.next
    # 主逻辑（改变指针）在进入后面节点的前面（由于前面的都已经处理好了，因此不会有环）
    head.next = pre
    dfs(next, head)

dfs(head, None)
```

- 后序遍历

```python
def dfs(head):
    if not head or not head.next: return head
    # 不需要留联系方式了，因为我们后面已经走过了，不需走了，现在我们要回去了。
    res = dfs(head.next)
    # 主逻辑（改变指针）在进入后面的节点的后面，也就是递归返回的过程会执行到
    head.next.next = head
    # 置空，防止环的产生
    head.next = None

    return res
```

- 如果是前序遍历，那么你可以想象前面的链表都处理好了，怎么处理的不用管。
- 相应地如果是后序遍历，那么你可以想象后面的链表都处理好了，怎么处理的不用管。

# 四个技巧

## 虚拟头

Q1:ans.next 指向什么？

```python
ans = ListNode(1)
ans.next = head
head = head.next
head = head.next
```

A1: 最开始的 head。

Q2:ans.next 指向什么？

```python
ans = ListNode(1)
head = ans
head.next = ListNode(3)
head.next = ListNode(4)
```

A2: ListNode(4)

Q3: 如下代码 ans.next 指向什么？

```python
ans = ListNode(1)
head = ans
head.next = ListNode(3)
head = ListNode(2)
head.next = ListNode(4)
```
