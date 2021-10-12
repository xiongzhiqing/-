/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-07-07 15:03:33
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-07-14 14:40:02
 */

/**
 * 队列（Queue）---- 只用 push 和 shift 完成增删的‘数组’
 *
 * 队列是一种先进先出（FIFO， First In First Out）的数据结构。
 *
 * 特征：
 * 1、只允许从尾部添加元素（push）
 * 2、只允许从头部移除元素（shift）
 *
*/

// 空队列
const queue = []

queue.push(1)
queue.push(2)
queue.push(3)

while (queue.length) {
  // 单纯访问队头元素（不出队）
  const top = queue[0]
  console.log('先入先出：', top)
  // 将队头出队
  queue.shift()
}
// 队空
console.log('队空', queue)

