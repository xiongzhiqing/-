/**
 * 典型真题快速上手-“有效括号”问题
 *
 * 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 *  左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    注意空字符串可被认为是有效字符串。
 *
 * 括号成立意味着什么？意味着对称性。
 *
*/
// 用一个map来维护左括号和有括号的对应关系
const leftToRight = {
  '{': '}',
  '(': ')',
  '[': ']',
}

const isValid = function (s) {
  // 空字符串无条件判断为 true
  if (!s) return true
  // 初始化 stack 数组
  const stack = []

  const len = s.length

  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i]
    // 判断是否是左括号
    if(['(', '{', '['].includes(ch)) {
      stack.push(leftToRight[ch])
    } else {
      // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
      // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) return false
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
}
console.log(isValid('([{}])'))