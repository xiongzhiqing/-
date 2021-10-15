/**
 * 链表的合并
 *
 * 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
 *
 * 链表处理类问题解题中心思想：处理链表的本质，是处理链表结点之间的指针关系。
 */
function ListNode (val) {
  this.val = val
  this.next = null
}
function mergeTwoLists (l1, l2) {
  // 定义头结点，确保链表可以被访问到
  let head = new ListNode()

  // cur 这里就是组合链表(针头， 穿针引线用)
  let cur = head
  // 指针在l1 和 l2 间穿梭
  while(l1 && l2) {
    // 如果 l1 的结点值较小
    if (l1.val <= l2.val) {
      cur.next = l1
      // l1 指针向前一步
      l1 = l1.next
    } else {
      // l2 较小时
      cur.next = l2
      // l2 向前一步
      l2 = l2.next
    }

    // 串起一个结点后，cur 向前一步
    cur = cur.next
    console.log(cur)
  }

  // 处理链表不等的情况
  cur.next = l1 !== null ? l1 : l2
  // 返回起始结点
  return head.next
}

const l1 = new ListNode(1)
const l1_1 = l1.next = new ListNode(2)
l1_1.next = new ListNode(4)

const l2 = new ListNode(1)
const l2_1 = l2.next = new ListNode(3)
l2_1.next = new ListNode(4)

let lists = mergeTwoLists(l1, l2)
console.log(JSON.stringify(lists), 'lists')