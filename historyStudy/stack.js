//数组中增加元素的三种方法
//1、unshift - 添加元素到数组的头部
//2、push - 添加元素到数组的尾部
//3、splice - 添加元素到数组的任意位置

//数组中删除元素的三种方法
//1、shift - 删除数组头部的元素
//2、pop - 删除数组尾部的元素
//3、splice - 删除数组任意位置的元素


//栈（Stack）---- 只能用 pop 和 push 完成增删的“数组”
//栈是一种后进先出（LIFO，Last In First Out）的数据结构。

//特征：
//1、只允许从尾部添加元素
//2、只允许从尾部取出元素

//栈相关题：取栈顶元素的操作。

//example：
// 初始状态，栈空
const stack = []
const arr = ['东北大板', '可爱多', '巧乐兹', '冰工厂', '光明奶砖']
// 入栈过程
arr.forEach(item => stack.push(item))
while(stack.length){
  const top = stack[stack.length - 1]
  console.log('现在取出的冰淇淋是', top)
  // 将栈顶元素出栈
  stack.pop()
}
