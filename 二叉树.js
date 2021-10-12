/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-07 17:23:00
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-07 17:43:44
 */

/**
 * 树的关键特性和重要概念：
 * 1、树的层次计算规则：根节点所在的那一层记为第一层，其子节点所在的就是第二次，以此类推。
 * 2、结点和树的‘高度’计算规则：叶子节点高度记为1，每向上一层高度就加1，逐层向上累加至目标节点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为‘树的高度’。
 * 3、‘度’的概念：一个结点开叉出去多少个子树，被记为节点的‘度’。
 * 4、‘叶子结点’：叶子结点就是度为0的结点。
*/

/**
 * 二叉树结构
 *
 * 二叉树是指需要满足以下要求的树：
 * 1、它可以没有根节点，作为一颗空树存在。
 * 2、如果它不是空树，那么必须由根节点、左子树和右子树组成，且左右子树都是二叉树。
 *
 * 二叉树不能被简单的定义为每个节点的度都是2的树。普通的树并不会区分左子树和右子树，但在二叉树中，左右子树的位置是严格约定、不能交换的。
*/

/**
 * 二叉树的编码实现
 *
 * 在JavaScript中， 二叉树使用对象来定义，它的结构分为三块：
 * 1、数据域
 * 2、左侧子结点（左子树根节点）的引用
 * 3、右侧子结点（右子树根节点）的引用
 *
*/

// 定义二叉树构造函数时，我们需要把左侧子结点和右侧子结点的预置为空


// 二叉树节点的构造函数
function TreeNode (val) {
  this.val = val
  this.left = this.right = null
}

// 新建一个二叉树结点
const node = new TreeNode(1)
console.log(node)
node.left = new TreeNode(2)
node.right = new TreeNode(3)
console.log(node)
node.left.left = new TreeNode(1)
node.left.rigth = new TreeNode(1)
console.log(node)