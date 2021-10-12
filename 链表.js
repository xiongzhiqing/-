/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-07 15:10:37
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-07 17:22:44
 */

/**
 * 链表
 * 链表和数组相似，它们都是有序的列表，都是线性结构（有且仅有一个前驱，有且仅有一个后继）。
 * 不同点在于，链表中，数据单位的名称叫作“结点”，而结点和结点的分布，在内存中可以是‘离散’的。
 *
 * 数组在内存中最为关键的一个特征，就是它一般是对应一段位于自己上界和下界之间的、一段连续的内存空间。元素与元素之间，紧紧相连。
 *
 *
 * 链表的结点，则允许散落在内存空间的各个角落里。
 *
 *
 * 链表中，每一个结点的结构都包含了两部分的内容： ‘数据域’和‘指针域’。
 * JavaScript中的链表，是以嵌套的对象的形式来实现的：
 * {
 *
      val: 1, // 数据域（存储的是当前节点所存储的数据值）
      next: { // 指针域，指向下一个结点（下一个结点‘后继结点’的引用）
        val: 2,
        next: null
      }
    }
 *
 * 要想访问链表中的任何一个元素， 都需要从起点节点开始，逐个访问next，一直访问到目标节点为止。
 *
 *
 * 链表的插入／删除效率较高，而访问效率较低
 * 数组的访问效率较高，而插入效率较低。
*/

// 链表节点的创建

// 创建链表节点，需要一个构造函数

function ListNode (val) {
  this.val = val
  this.next = null
}

const node = new ListNode(1)
const node2 = node.next = new ListNode(2)

console.log(node)


/**
 * 链表元素的添加
 *
 * 链表是通过next指针来维系的。因此，链表元素的添加和删除操作，本质上都是在围绕next指针做文章。
 *
*/

/**
 * 1、直接在尾部添加
*/
const node3 = node2.next = new ListNode(3)
console.log(node2, node3)

/**
 * 2、任意两结点间插入一个新结点 ---- 需要变更的是前驱节点和目标结点的next指针指向
 */

// 插入结点node 和 node2 之间

// 如果目标节点本来不存在，那么手动创建
const node4 = new ListNode(4)
// 把node4的next指针指向node2（即node.next)
node4.next = node.next
// 把node的next指针指向node4
node.next = node4

console.log(node4)


/**
 * 3、链表元素的删除
 *
 * 删除的标准是：在链表的遍历过程中，无法在遍历到某个结点的存在。
 *
 * 涉及链表删除操作中，重点不是定位目标结点，而是定位目标结点的前驱结点。
 *
*/

// 删除node4，直接让它的前驱结点node的next指针跳过它，指向node4的后继即可

node.next = node2
console.log('node', node)


// 利用node可以定位到node3
const target = node.next
console.log(target)
node.next = target.next
console.log(node.next, node)

