/**
 * 环形链表基本问题 -- 如何判断一个链表是否成环
 *
 * 真题描述：给定一个链表，判断链表中是否有环。
 */

const hasCycle = function (head) {
  // 只要结点存在，那么就继续遍历
  while (head) {
    // 如果flag已经立过了，那么说明环存在
    if (head.flag) {
      return true
    } else {
      // 如果 flag 没立过，就立一个flag 再往下走
      head.flag = true
      head = head.next
    }
  }
  return false
}


/**
 * 环形链表衍生问题 -- 定位环的起点
 *
 * 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null
 */

const detectCycle = function (head) {
  while (head) {
    if (head.flag) return head
    head.flag = true
    head = head.next
  }
  return null
}

/**
 * 快慢指针实现定位环的起点
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/linked-list-cycle-ii-kuai-man-zhi-zhen-shuang-zhi-/
*/
var detectCycle = function (head) {
  let slowP = head, fastP = head // 都从头节点出发
  while (fastP) {                // head就是null了，没有入环点，直接返回null
    if (fastP.next == null) return null // fastP.next为null也说明无环
    slowP = slowP.next           // 慢指针走一步
    fastP = fastP.next.next      // 快指针走两步
    if (slowP == fastP) {        // 首次相遇
      fastP = head               // 让快指针回到头节点
      while (true) {             // 开启循环，让快慢指针相遇
        if (slowP == fastP) {    // 相遇，地点发生在入环处
          return slowP           // 返回出指针的位置
        }
        fastP = fastP.next       // 快慢指针都走一步
        slowP = slowP.next
      }
    }
  }
  return null
};
