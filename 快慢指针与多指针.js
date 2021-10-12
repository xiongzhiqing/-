// 涉及反复遍历的特征：往往会涉及相对复杂的链表操作，比如反转、指定位置的删除等等。
// 解决方案：双指针中的“快慢指针”。
// 快慢指针指额是两个一前一后的指针，两个指针往同一个方向走，只是一个快一个慢。
// 快慢指针严格来说只能有俩，不过实际做题中，可能会出现一前、一中、一后的三个指针，這种超过两个指针的解题方法也叫“多指针法”。

// 快慢指针 + 多指针，双管齐下，可以解决链表中的大部分复杂操作问题。

// ***** 快慢指针 ---- 删除链表的倒数第 N 个结点

/**
 * 题目1：
 * 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 * 示例：
 * 给定一个链表：1->2->3->4->5, 和 n = 2
 * 当删除了倒数第二个结点后，链表变为 1->2->3->5
 * 说明：给定的 n 保证是有效的。
 *
 * 解法（思路分析）：
 * 小贴士：dummy结点的使用，
 * dummy结点：它可以帮助出来掉头结点为空的边界问题，帮助简化解题过程。
 * 因此设计链表操作、尤其是涉及结点删除的题目（对前驱结点的存在性要求比较高），都建议写代码的时候直接把 dummy 给用起来，建立好的编程习惯：
 *
 * const dummy = new ListNode()
 * 这里的head是链表原有的第一个结点
 * dummy.next = head
 *
 * “倒数”变“正数”
 *
 * 难点：“倒数第 N 个”如果定位
 *
 * 考虑到咋们的遍历不可能从后往前走，因此这个“倒数第 N ”个，完全可以转换为“正数第 len - n + 1”个。len：链表的总长度
 *
 * 直接遍历两趟： 第一趟，设置一个变量 count = 0，每遍历到一个不为空的节点， count 就加 1，一直遍历到链表结束为止，得到链表的总长度 len；
 * 根据总长度 len 计算出倒数第 n 个 到底是正数第几个（M = len - n + 1）
 * 遍历到 M - 1（也就是 len - n）个结点的时候就可以停下来了，执行删除操作。
 *
 *
 * 定义两个指针 slow 和 fast，全部指向链表的起始位 ---- dummy结点
 *
 * 1、首先：快指针先出发！闷头走上 n 步，在第 n 个节点处打住， 这 n = 2；
 *
 * 2、然后：快慢指针一起前进，当快指针前进到最后一个节点处时，两个指针再一起停下来；
 *
 * 3、此时，慢指针所指的位置，就是倒数第 n 个结点的前一个结点；
 *
 * 总结一下：
 * 链表删除问题中， 若走两次遍历，我们做了两件事：
 * 1、求长度
 * 2、做减法，找定位。
 *
 * 若用快慢指针，其实是把做减法和找定位这个过程给融合了。通过让快指针先行一步、接着快慢指针一起前进这个操作，巧妙的把两个指针之间的差值保持在 n 上（用空间换时间，本质上其实就是对关键信息进行提前记忆，这里相当于用两个指针对差值实现了记忆），这样当快指针走到链表末尾（第 len 个）时，慢指针刚好就在 len - n 这个地方稳稳落地。
*/

const removeNthFromEnd = function (head, n) {
  // 初始化dummy结点
  const dummy = new ListNode()
  // dummy 指向头结点
  dummy.next = head

  // 初始化快慢指针，均指向dummy
  let fast = dummy
  let slow = dummy

  // 快指针闷头走 n 步
  while (n !== 0) {
    fast = fast.next
    n--
  }

  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }

  // 慢指针删除自己的后继结点
  slow.next = slow.next.next
  // 返回头结点
  return dummy.next
}

// 多指针法 ---- 链表的反转

/**
 * 完全反转一个链表
 *
 * 题目2：
 * 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
 *
 * 示例：
 * 输入：1 -> 2 -> 3 -> 4 -> 5 -> NUll
 * 输出：5 -> 4 -> 3 -> 2 -> 1 -> NULL
 *
 * 解法（思路分析）：
 * 处理链表的本质，就是处理链表结点之间的指针关系。
 * 想办法把每个结点的 next 指针的指向给反过来就行了。
 *
 * 这里需要三个指针， 它们分别指向目标节点（cur）、目标节点的前驱结点（pre）、目标节点的后继节点（next）。
 *
 * cur.next = pre 就做到了 next 指针的反转。
 * next.next = cur
 *
 * @param {ListNode} head
 * @return {ListNode}
*/

const reverseList = function (head) {
  // 初始化前驱结点为null
  let pre = null
  // 初始化目标节点为头结点
  let cur = head
  // 只要目标结点不为null，遍历就得继续
  while (cur !== null) {
    // 记录一下 next 结点
    let next = cur.next
    // 反转指针
    cur.next = pre
    // pre往前走一步
    pre = cur
    // cur往前走一步
    cur = next
  }
  // 反转结束后， pre就会变成新链表的头结点
  return pre
}


// ***** 局部反转一个链表

/**
 * 题目2：
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 *
 * 说明：1 <= m <= n <= 链表长度
 *
 * 解法（思路解读）：
 * 由于遍历链表的顺序是从前往后遍历，那么为了避免结点1和结点2随着遍历向后推进被遗失，需要提前把1结点缓存下来。而结点5就没那么麻烦了；随着遍历的进行，当我们完成了结点4的指针反转后，此时cur指针就恰好指在结点5上；此时直接将结点2的next指向cur、将结点1的next指针指向pre即可。
*/
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 入参是头结点、m、n
const reverseBetween = function (head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, cur, leftHead
  // 定义假结点dummy
  const dummy = new ListNode()
  // dummy后继结点是头结点
  dummy.next = head

  // p 是以游标，用于遍历，最初指向dummy
  let p = dummy
  // p 往前走 m - 1 步，走到整个区间的前驱结点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }

  // 缓存这个前驱结点到 leftHead 里
  leftHead = p
  // start 是反转区间的第一个结点
  let start = leftHead.next
  // pre 指向 start
  pre = start

  // cur 指向 start 的下一个结点
  cur = pre.next

  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  // leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre

  // 将区间内反转的最后一个结点 next 指向 cur
  start.next = cur
  // dummy.next 永远指向链表头结点
  return dummy.next
}