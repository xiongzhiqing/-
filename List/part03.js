/**
 * 删除为题的延伸 -- dummy 结点登场
 *
 * 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
 */

function ListNode (val) {
  this.val = val
  this.next = null
}

const deleteDuplicates = function(head) {
  // 极端情况：0个或者1个结点，则不会重复，直接返回
  if (!head || !head.next) return head

  // dummy 登场
  let dummy = new ListNode()
  // dummy 永远指向头结点
  dummy.next = head

  // cur 从 dummy 开始遍历
  let cur = dummy

  // 当 cur 的后面有至少两个节点时
  if (cur.next && cur.next.next) {
    // 对 cur 后面的两个结点值进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，则记下这个值
      let val = cur.next.val
      while (cur.next && cur.next.val == val) {
        // 若有，则删除
        cur.next = cur.next.next
      }
    } else {
      // 若不重复， 则正常遍历
      cur = cur.next
    }
  }

  // 返回链表的起始结点
  return dummy.next
}