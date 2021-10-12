/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-07 17:54:57
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-14 10:25:29
 */


/**
 * 二叉树的遍历 ---- 思路解读
 *
 * 以一定的顺序规则，逐个访问二叉树的所有节点，这个过程就是二叉树的遍历。
 *
 * A：按照顺序规则的不同，遍历方式有以下四种：
 * 1、先序遍历
 * 2、中序遍历
 * 3、后序遍历
 * 4、层次遍历
 *
 * B：按照事先方式的不同，遍历方式又可以分为以下两种：
 * 1、递归遍历（先、中、后序遍历）
 * 2、迭代遍历（层次遍历）
*/

/**
 * 递归遍历：函数Func直接或间接调用函数本身，则该函数称为递归函数。
 *
 * ‘递归’就意味着‘反复’
 * 对二叉树的定义，就可以理解为是一个递归式的定义：
 * 1、它可以没有根结点，作为一颗空树存在
 * 2、如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树。
 *
 * 这样定义有着这样的内涵：
 * 如果想要创建一个二叉树结点作为根结点，那么它左侧的子结点和右侧的子结点也都必须符合二叉树结点的定义，这意味着需要反复的执行“创建一个由数据域、左右子树组成的结点”这个动作，知道数据被分配完为止。
 *
 * 所谓的“先序”、“中序”和“后序”， “先”、“中”、“后”其实就是指 根结点 的遍历时机。
 */


/**
 * 编码实现：
 * 1、先序遍历
 * 2、中序遍历
 * 3、后序遍历
*/


const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}


/**
 * 递归函数的编写要点
 *
 * 1、递归式
 *    递归式，指每一次重复的内容是什么
 * 2、递归边界
 *    递归边界，指什么时候停下来
 *
 *
*/

// 1、先序遍历

// 所有遍历函数的入参都是树的根结点对象
function preorder (root) {
  // 递归边界，root为空
  if (!root) {
    return
  }

  console.log('先序遍历-当前遍历的结点值是：', root.val)
  // 递归遍历左子树
  preorder(root.left)
  // 递归遍历右子树
  preorder(root.right)
}

preorder(root)

console.log('----------------------------------------')

// 2、中序遍历

function inorder (root) {
  // 递归边界，root为空
  if (!root) {
    return
  }

  inorder(root.left)
  // 输出当前遍历的结点值
  console.log('中序遍历-当前遍历的结点值是：', root.val)
  inorder(root.right)
}
inorder(root)

console.log('----------------------------------------')

// 3、后序遍历

function postorder (root) {
  // 递归边界，root为空
  if (!root) {
    return
  }

  // 递归遍历左子树
  postorder(root.left)
  postorder(root.right)
  console.log('后序遍历-当前遍历的结点值是：', root.val)
}
postorder(root)