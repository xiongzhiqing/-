/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-15 10:42:15
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-15 14:44:25
 */
// 链表的应用 -- 实例



/**
 * 链表问题分类：
 * 1、链表的处理：合并、删除等（删除操作画个记号，重点中的重点！）
 * 2、链表的反转及其衍生题目
 * 3、链表成环问题及其衍生题目
*/

// ***** 链表的合并

/**
 * 题目1：
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例：
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 *
 * 解法（思路分析）：链表本身就是有序的。
 * 链表处理类问题，一个中心思想 ---- ““处理链表的本质，是处理链表结点之间的指针关系””
 *
 * 两个链表如果要合并为一个链表，只需要洽淡的补齐双方之间结点next指针的指向关系。
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 *
*/
function ListNode (val) {
  this.val = val
  this.next = null
}


const mergeTwoLists = function (l1, l2) {
  // 定义头结点，确保链表可以被访问到（又叫dummy结点，指向链表的起始位置）
  let head = new ListNode()
  // cur 这里就是那根穿针引线的那根“针”
  let cur = head

  // "针"开始在l1和l2间穿梭
  while (l1 && l2) {
    // 如果 l1 的结点值较小
    if (l1.val <= l2.val) {
      // 先串起 l1 的节点
      cur.next = l1
      // l1 指针向前一步
      l1 = l1.next
    } else {
      // l2 较小时，串起 l2 节点
      cur.next = l2
      // l2 指针向前一步clear
      l2 = l2.next
    }
    // "针"在串起一个节点后，也会往前一步
    cur = cur.next
  }

  // 处理链表不等长的情况
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
console.log(lists, 'lists')

// 链表循环
// while (lists.next) {
//   lists = lists.next
// }
console.log(lists, 'lists')

// ***** 链表结点的删除

/**
 * 题目2：
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 *
 * 示例1：
 * 输入：1->1->2
 * 输出：1->2
 *
 * 示例2：
 * 输入：1->1->2->3->3
 * 输出：1->2->3
 *
 *
 * 解法（思路分析）：
 * 链表删除是一个基础且关键的操作，将需要删除的目标结点的前驱结点next指针往后指一格；
 * 判断两个元素是否重复，有序的链表，可以直接判断前后两个元素值是否相等即可；
*/

const NotRepalce = function (head) {
  // 设定cur指针，初期位置为链表第一个结点
  let cur = head
  // 遍历链表
  while (cur != null && cur.next != null) {
    // 若当前结点和它后面一个结点相等（重复）
    if (cur.val === cur.next.val) {
      // 删除靠后的那个结点（去重）
      cur.next = cur.next.next
    } else {
      // 若不重复， 继续遍历
      cur = cur.next
    }
  }
  return head
}

// ***** 删除问题的延伸 ---- dummy结点

/**
 * 题目3：
 * 给定一个排序链表，删除所有包含重复数字的节点，只保留原始链表中没有重复出现的数字。
 *
 * 示例 1:
 * 输入: 1->2->3->3->4->4->5
 * 输出: 1->2->5
 *
 * 示例 2:
 * 输入: 1->1->1->2->3
 * 输出: 2->3
 *
 * 解法（思路分析）：
 * dummy结点，就是认为制造出来的第一个结点的前驱结点，这样链表中所有的节点都能够确保有一个前驱结点。
 * dummy结点能够帮助我们降低链表处理过程的复杂度，处理链表时，不设dummy节点思路可能会打不开；
 * 设了dummy节点的话，就算不一定用得上，也不会出错。
 *
 * @param {ListNode} head
 * @return {ListNode}
*/

const deleteDuplicatesNotRepalce = function (head) {
  // 极端情况下： 0个或1个节点，就不会重复，直接返回
  if (!head || !head.next) {
    return head
  }

  // dummy登场
  let dummy = new ListNode()
  // dummy永远指向头结点
  dummy.next = head
  // cur 从dummy开始遍历 cur = {val: undefined, next: head}
  let cur = dummy

  // 当cur的后面有至少两个结点时
  while (cur.next && cur.next.next) {
    // 对cur后面的两个节点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，测记下这个值
      let val = cur.next.val
      // 反复的排查后面的元素是否还存在多次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有则删除
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


console.log(deleteDuplicatesNotRepalce(lists))