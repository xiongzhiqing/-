/**
 * 队列：
 * 1、栈向队列的转化
 * 2、双端队列
 * 3、优先队列 -- 属于高级数据结构，其本质是二叉堆结构
*/

// ***** 如何用栈实现一个队列

/**
 * 题目1：
 * 使用栈省市县队列的下列操作：
 * 1、push(x) -- 将一个元素放入队列的尾部
 * 2、pop()   -- 从队列首部移除元素
 * 3、peek()  -- 返回队列首部的元素
 * 4、empty() -- 返回队列是否为空
 *
 * 示例：
 * MyQueue queue = new MyQueue()
 * queue.push(1)
 * queue.push(2)
 * queue.peek()   -> 返回 1
 * queue.pop()    -> 返回 1
 * queue.empty()  -> 返回false
 *
 * 说明：
 * 1、只能使用标准的栈操作 -- 也就是只有push to top， peek／pop from top，size 和 is empty 操作是合法的。
 * 2、使用的语言也许不支持栈。可以使用list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 * 3、假设所有操作都是有效的（例如，一个空的队列不会调用pop 或者 peek 操作）。
 *
 * 解法（思路分析）：
 * 栈和队列的区别：
 * 栈，先进后出；队列，先进先出。两者的进出顺序相反。
 * 用栈实现队列，就是用栈实现先进先出的效果（想办法让栈底的元素首先被取出），也就是让出栈序列 被逆序。
 *
 * 栈结构决定了栈底元素只能被死死地压在最底下
 * 使用两个栈来解决：stack1： [1->2->3]  stack2: []
 * 1、把stack1出栈，然后入栈到stack2中 -- 此时stack2的出栈序列刚好就对应队列的出队序列
 *    stack1： []  stack2: [3->2->1]
 * 2、stack1入栈新元素4，当新元素 4 需要被出栈时， stack2 一定已经空掉了。当stack2为空， 而stack1不为空时，继续把stack1的元素转移到stack2中取， 然后从stack2中取元素。（所有的出队操作都只能依赖stack2来完成----只要坚持这个原则， 就可以确保stack1里的元素都能够按照正确的顺序（逆序）出栈）。
 *
 *
 *
*/


function MyQueue () {
  // 初始化两个栈
  this.stack1 = []
  this.stack2 = []
}
/**
* Push element x to the back of queue.
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function (x) {
  // 直接调度数组的push方法
  this.stack1.push(x)
}
/**
* Removes the element from in front of queue and returns that element.
* @return {number}
*/
MyQueue.prototype.pop = function () {
  // 假如 stack2 为空， 需要将 stack1 的元素转移进来
  if (this.stack2.length <= 0) {
    // 当stack1不为空时，出栈
    while (this.stack1.length !== 0) {
      // 将stack1出栈的元素推入stack2中
      this.stack2.push(this.stack1.pop())
    }
  }
  // 为了达到逆序的目的，只从stack2中出栈元素
  return this.stack2.pop()
}
/**
 * Get the front element
 * @return {number}
 * 这个方法和pop唯一的区别就是没有将定位到的值出栈
 */
MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    // 当stack1不为空时，出栈
    while (this.stack1.length != 0) {
      // 将stack1出栈的元素推入stack2
      this.stack2.push(this.stack1.pop())
    }
  }

  // 缓存stack2的长度
  const stack2Len = this.stack2.length
  return stack2Len && this.stack2[stack2Len - 1]
}
/**
* Returns whether the queue is empty.
* @return {boolean}
*/
MyQueue.prototype.empty = function () {
  // 若stack1 和  stack2均为空，那么队列空
  return !this.stack1.length && !this.stack2.length
}

// ***** 双端队列就是允许在队列的两端进行插入和删除的队列
// 在编码上体现为：既允许使用pop、push 同时又允许使用 shift、unshift的数组；

const queue = [1, 2, 3, 4] // 定义一个双端队列
queue.push(1) // 双端队列尾部入队
queue.pop() // 双端队列尾部出队
queue.shift() // 双端队列头部出队
queue.unshift(1) // 双端队列头部入队


// *** 滑动窗口问题

/**
 * 题目2：
 * 给定一个数组 nums 和滑动窗口的大小 k， 请找出所有滑动窗口里的最大值。
 *
 * 示例：
 * 输入：nums = [1,3,-1,-3, 5, 3, 6, 7] 和 k = 3
 * 输出：[3,3,5,6,7]
 *
 * 解释：滑动窗口的位置
 * [1 3 -1] -3 5 3 6 7
 * 1 [3 -1 -3] 5 3 6 7
 * 1 3 [-1 -3 5] 3 6 7
 * 1 3 -1 [-3 5 3] 6 7
 * 1 3 -1 -3 [5 3 6] 7
 * 1 3 -1 -3 5 [3 6 7]
 *
 * 提示：可以假设 k 总是有效的，在输入数组不为空的情况下， 1 <= k <= 输入数组的大小。
 *
 * 解法（思路分析）：双指针 + 遍历法
 * 窗口的本质其实就是一个范围（约束范围可以使用双指针）
 *
*/
const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3
/**
 * 双指针 + 遍历法 ---- 找出所有滑动窗口中的最大值 时间复杂度O(kn)
 *
 * @param {*} nums
 * @param {*} k
 * @returns {Array}
 */
const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length
  // 定义结果数组
  const res = []
  // 初始化左指针
  let left = 0
  // 初始化右指针
  let right = k - 1
  // 当数组没有被遍历完时，执行循环体内的逻辑
  while (right < len) {
    // 计算当前窗口内的最大值
    const max = calMax(nums, left, right)
    res.push(max)
    // 左指针前进一步
    left++
    // 右指针前进一步
    right++
  }
  // 返回结果数组
  return res
}
// 计算最大值函数
function calMax (arr, left, right) {
  // 处理数组为空的编辑情况
  if (!arr || !arr.length) {
    return
  }
  // 初始化，maxNum的值为窗口的第一个元素
  let maxNum = arr[left]
  // 遍历窗口内所有元数， 更新maxNum的值
  for (let i = left; i <= right; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i]
    }
  }
  // 返回最大值
  return maxNum
}

console.time('maxSlidingWindow')
console.log(maxSlidingWindow(nums, k))
console.timeEnd('maxSlidingWindow')

/**
 * 双端队列法 ---- 找出所有滑动窗口中的最大值 时间复杂度O(n)
 * 在线性时间复杂度内解决
 * 在窗口移动时，只根据发生变化的元素对最大值进行更新
 *
 * 使用双端队列发，核心思想是维护一个“有效的递减队列”
 *
 * 将遍历到的每一个元素都推入队列内部
 * 每尝试推入一个元素前，都把这个元素与队列头部的元素做对比。根据对比结果的不同，采取不同的措施：
 * 1、如果试图推入的元素（当前元素）大于队尾元素， 则意味着队列的递减趋势被打破了。此时需要将队列尾部的元素依次出队（注意：由于是双端队列，所以队尾出队是没有问题的）、直到队尾元素大于等于当前元素为止，此时再将当前元素入队。
 * 2、如果试图推入的元素小于队列尾部的元素，那么就不需要额外的操作，直接把当前元素入队即可。
 *
 * 维持递减队列的目的，就在于“确保队头元素始终是当前窗口的最大值”。
 *
 * 当遍历到的元素个数达到 k 时，意味着滑动窗口的第一个最大值已经产生了，直接push进入结果数组里。
 * 为了确保队列的有效性，需要及时地去队列检查（队列本身只维护当前滑动窗口内的元素）。
 *
 * 总结：
 * 1、检查队尾元素，看是不是都满足大于等于当前元素的条件。如果是的话，直接将当前元素入队。否则，将队尾元素逐个出队、直到队尾元素大于等于当前元素为止。
   2、将当前元素入队
   3、检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了。如果是，则将队头元素出队。
   4、判断滑动窗口的状态：看当前遍历过的元素个数是否小于 k。如果元素个数小于k，这意味着第一个滑动窗口内的元素都还没遍历完、第一个最大值还没出现，此时我们还不能动结果数组，只能继续更新队列；如果元素个数大于等于k，这意味着滑动窗口的最大值已经出现了，此时每遍历到一个新元素（也就是滑动窗口每往前走一步）都要及时地往结果数组里添加当前滑动窗口对应的最大值（最大值就是此时此刻双端队列的队头元素）。

   目的：
 * 1、维持队列的“递减性”：确保对头元素是当前滑动窗口的最大值。这样每次取最大值时，直接取对头元素即可。
 * 2、维持队列递减性的基础上，更新队列的内容。
 * 3、维持队列的“有效性”：确保队列里所有元素都在滑动窗口圈定的范围以内。
 * 4、排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况
 *
 * @param {*} nums
 * @param {*} k
 * @returns {Array}
 */
const maxSlidingWindow2 = function (nums, k) {
  // 缓存数组长度
  const len = nums.length
  // 初始化结果数组
  const res = []
  // 初始化双端队列
  const deque = []

  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素时
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop()
    }
    // 入队当前元素索引（注意是索引）
    deque.push(i)
    // 当对头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将对头元素索引出队
      deque.shift()
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于k的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]])
    }
  }
  // 返回结果数组
  return res
}

console.time('maxSlidingWindow2')
console.log(maxSlidingWindow2(nums, k))
console.timeEnd('maxSlidingWindow2')