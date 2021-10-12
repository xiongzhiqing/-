// 环形链表基本问题 ---- 如何判断链表是否成环？

/**
 * 题目1：
 * 给定一个链表，判断链表中是否有环。
 *
 * 示例1：
 * 输入：[3,2,0,4]
 * 输出：true
 * 解释：链表中存在一个环
 *
 * 解法（思路解读）：
 *
 * 一个环形链表的基本修养，是能够让遍历它的游标回到原点；
*/

const hasCycel = function (head) {
  // 只要结点存在，那么就继续遍历
  while (head) {
    // 如果flag已经立国了， 那么说明环存在
    if (head.flag) {
      return true
    } else {
      // 如果flag 没立过， 那么就立一个 flag 再往下走
      head.flag = true
      head = head.next
    }
  }
  return false
}

// ***** 环形链表衍生问题 ---- 定位环的起点

/**
 * 题目2：
 * 给定一个链表，返回链表开始入环的第一个结点。如果链表无环，则返回null。
 *
 * 示例1：
 * 输入：head = [3,2,0,-4]
 * 输出：tail connects to node index 1
 * 解释：链表中有一个环，其尾部链接到第二个结点。
 *
 * 示例2：
 * 输入：head = [1, 2]
 * 输出：tail connencts to node index 0
 * 解释：链表中有一个环，其尾部链接到第一个结点。
 *
 * 示例2：
 * 输入：head = [1]
 * 输出：no cycle
 * 解释：链表中没有环
 *
 *
 * 解法（思路解读）：
 * 如果一个结点是环形链表成环的起点，那么它一定是第一个被发现flag标志已存在的结点；
*/

const detectCycle = function (head) {
  while (head) {
    if (head.flag) {
      return head
    } else {
      head.flag = true
      head = head.next
    }
  }
  return null
}


// ***** 快慢指针的思路
/**
 * 一个公认的比较经典的思路，就是用快慢指针来做：
 * 定义慢指针slow，快指针fast。两者齐头并进，slow一次走一步，fast一次走两步。
 * 如果它们是在一个有环的链表里移动，一定有相遇的时刻。
 * 如果两者没有相遇，同时 fast 遍历到了链表的末尾，发现 next 指针指向 null，则链表中不存在环
*/

function ListNode (val) {
  this.val = val
  this.next = null
}

const detectCycle1 = function (head) {
  // 定义快慢指针
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    // 如果它们是在一个有环的链表里移动，一定有相遇的时刻。
    if (slow === fast) {
      // cur 从链表头部处方， slow 从 fast 与 slow 相遇点出发
      let cur = head
      while (cur !== slow.next) {
        cur = cur.next
        slow = slow.next
      }
      // 环的入口
      return cur
    }
  }
}