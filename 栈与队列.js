// 涉及括号问题，则很有可能和栈相关


// 栈结构可以帮忙避免重复操作
// 避免重复操作的秘诀就是及时地将不必要的数据出栈，避免它对后续的遍历产生干扰

/**
 * 题目1：
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 *
 * 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 *
 * 示例 1:
 * 输入: "()"
 * 输出: true
 *
 * 示例 2:
 * 输入: "()[]{}"
 * 输出: true
 *
 * 示例 3:
 * 输入: "(]"
 * 输出: false
 *
 * 示例 4:
 * 输入: "([)]"
 * 输出: false
 *
 * 示例 5:
 * 输入: "{[]}"
 * 输出: true
 *
*/
// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  // 结合题意，空字符串无条件判断为 true
  if (!s) {
    return true;
  }
  // 初始化 stack 数组
  const stack = [];
  // 缓存字符串长度
  const len = s.length;
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i];
    // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
    if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
    // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
    else {
      // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
};


/**
 * 题目2:
 * 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
 *
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]
 *
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 *
 * 思路： 尝试去维护一个递减栈
 * 当遍历过的温度，维持的是一个单调递减的态势时，我们就对这些温度的索引下标执行入栈操作；只要出现了一个数字，它打破了这种单调递减的趋势，也就是说它比前一个温度值高，这时我们就对前后两个温度的索引下标求差，得出前一个温度距离第一次升温的目标差值。
 *
 * 仅对每一个温度执行一次入栈操作、一次出栈操作，整个数组只会被遍历一次。因此时间复杂度就是O(n)。
*/

const dailyTemperatures = function (T) {
  // 缓存数组的长度
  const len = T.length
  // 初始化一个栈
  const stack = []
  // 初始化结果数组，占位为0
  const res = Array(len).fill(0)

  for (let i = 0; i < len; i++) {
    // 若栈不为0，且存在打破递减趋势的温度值
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      // 将栈顶温度值对应的索引出栈
      const top = stack.pop()

      // 计算 当前栈顶温度值与第一个高于它的温度值的索引差值
      res[top] = i - top
    }

    // 注意栈里存的不是温度值，而是索引值，这里是为了后面计算方便
    stack.push(i)
  }
  // 返回结果数组
  return res
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))

// ***** 栈的设计 ---- ‘最小栈’entity

/**
 * 题目2：
 * 设计一个支持 push、pop、top操作，并能在常数时间内检索到最小元素的栈。
 *
 * push(x)  ---- 将元素 x 推入栈中
 * pop()    ---- 删除栈顶的元素
 * top()    ---- 获取栈顶元素
 * getMin() ---- 检索栈中的最小元素
 *
 * 实例：
 *
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); --> 返回 -3.
 * minStack.pop();
 * minStack.top(); --> 返回 0.
 * minStack.getMin(); --> 返回 -2.
*/

// 实现1: 时间复杂度O(n)
function MinStack () {
  this.stack = []
}

MinStack.prototype.push = function (x) {
  this.stack.push(x)
}

MinStack.prototype.pop = function () {
  this.stack.pop()
}

MinStack.prototype.top = function () {
  if (!this.stack || !this.stack.length) {
    return
  }
  return this.stack[this.s.length - 1]
}

MinStack.prototype.getMin = function () {
  let minValue = Infinity

  const { stack } = this

  for (let i = 0; i < stack.length; i++) {
    if (stack[i] < minValue) {
      minValue = stack[i]
    }
  }

  return minValue
}


// 实现2：时间复杂度O(1)
// 时间效率的提升，意味着需要付出更多的控件占用作为代价。
// 再生产一个栈（stack2）作为辅助，让这个栈去容纳当前的最小值。（***** 栈底到栈顶呈递减趋势的栈）
/**
 * 栈底到栈顶呈递减趋势的栈
 * 1、取最小值：由于整个栈从栈底到栈顶递减，因此栈顶元素就是最小元素。
 * 2、若有新元素入栈：判断是不是比栈顶元素还要小，否则不准进入stack2。
 * 3、若有元素出栈：判断是不是和栈顶元素相等，如果是的话，stack2 也要出栈。
 */

function MinStack2 () {
  this.stack = []
  // 定义辅助栈
  this.stack2 = []
}

MinStack2.prototype.push = function (x) {
  this.stack.push(x)
  // 若入栈的值小于当前最小的值，则推入辅助栈栈顶
  if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x)
  }
}

MinStack2.prototype.pop = function () {
  // 若出栈的值和当前最小值相等， 那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() === this.stack2[this.stack2.length - 1]) {
    this.stack2.pop()
  }
}

MinStack2.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

MinStack2.prototype.getMin = function () {
  // 辅助栈stack2的栈顶， 存的就是目标中最小值
  return this.stack2[this.stack2.length - 1]
}