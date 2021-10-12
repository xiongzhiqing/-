/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-07 14:55:20
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-07 15:10:26
 */

/**
 * 栈（Stack）---- 只用 pop 和 push 完成增删的‘数组’
 *
 * 栈是一种先入后出（LIFO，Last In First Out）的数据结构。
 *
 * 特征：
 * 1、只允许从尾部添加元素(push)
 * 2、职院许从尾部取出元素(pop)
 *
 * 在JavaScript中，栈就是限制只能用 push 来添加元素， 同时只能用 pop 来移除元素的一种特殊的数组
*/


// 初始状态， 栈空
const stack = []

// 入栈过程
stack.push('zs')
stack.push('ls')
stack.push('ww')
stack.push('栈')


// 出栈过程，栈不为空时才执行

while (stack.length) {
  // 单纯的访问栈顶元素（不出栈）
  const top = stack[stack.length - 1]
  console.log('先入后出：' + top)
  // 将栈顶元素出栈
  stack.pop()
}

// 栈空
console.log('栈空:', stack)