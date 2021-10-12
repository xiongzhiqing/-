// 基本算法技能

// 1、反转字符串

// 定义被反转的字符串
const str = 'juejin'
// 定义反转后的字符串
const res = str.split('').reverse().join('')
console.log(res)

// 2、判断一个字符串是否是回文字符串
// 回文字符串特性：
// 1、就是正着读和倒着读都一抹一眼的字符串。
// 2、从中间位置“劈开”，那么两边的子串在内容上是完全对称的。
// 例如：yessey
const str1 = 'yessey'

/**
 * 是否是回文字符串
 * **** 就是正着读和倒着读都一抹一眼的字符串。
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome (str) {
  // 先反转字符串
  const reversedStr = str.split('').reverse().join('')
  // 判断反转后前后是否相等
  return reversedStr === str
}

/**
 * 是否是回文字符串
 * **** 从中间位置“劈开”，那么两边的子串在内容上是完全对称的。
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome1 (str) {
  // 缓存字符串的长度
  const len = str.length
  // 遍历前半部分
  for (let i = 0; i < len / 2; i++) {
    // 判断和后半部分是否对称
    if (str[i] !== str[len - i - 1]) return false
  }
  return true
}
console.log('isPalindrome1:', isPalindrome1(str1), 'isPalindrome:', isPalindrome(str1))



/**
 * 回文字符串的衍生问题
 *
 * 题目1：
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能称为回文字符串。
 *
 * 示例1：
 * 输入：‘aba’
 * 输出：true
 *
 * 示例2：
 * 输入：‘abca’
 * 输出：true
 * 解释：可以删除c字符
 *
 * 注意：字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 *
 * 如何判断解决回文类问题的解法是否“高效”，其中一个很重要的标准是对回文字符串的特性利用的是否彻底。
 *
 * 解法：
 * 对称性 和 双指针。这两个工具一起上， 足以解决大部分的回文字符串衍生问题。
 * 1、初始化两个指针，一个指向字符串头部，另一个指向尾部；
 * 2、如果两个指针所指的字符串恰好相等，那么这两个字符串就符合了回文字符串对称性的要求，跳过它们往下走即可，如果两个指针所指的字符串不等，那么就意味着不对称发生了，意味着这是一个可以“删掉试试看”的操作点。可以分别对左指针字符和右指针字符尝试进行“跳过”，看看区间在 [left+1, right] 或 [left , right - 1] 的字符串是否回文。如果是的话， 那么就意味着如果删掉被“跳过”那个字符，整个字符串都将回文：
 */

const validPalindrome = function (s) {
  // 缓存字符串的长度
  const len = s.length

  // l、r分别为左右指针
  let l = 0, r = len - 1

  // 当左右指针均满足对称时，一起想中间前进
  while (l < r && s[l] === s[r]) {
    l++
    r--
  }
  // 尝试判断跳过左指针元素后字符串是否回文
  if (isPalindrome(l + 1, r)) {
    return true
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(l, r - 1)) {
    return true
  }

  // 工具方法，用于判断字符串是否回文
  function isPalindrome (start, end) {
    while (start < end) {
      if (s[start] !== s[end]) {
        return false
      }
      start++
      end--
    }
    return true
  }

  // 默认发挥false
  return false
}

console.log('validPalindrome:', validPalindrome('ababa'))

// 字符串匹配问题 ---- 正则表达式

/**
 * 题目2：
 * 设计一个支持以下两种操作的数据结构
 * void addWord(word)
 * bool search(word)
 * search(word)可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z。
 * . 可以表示任何一个字母。
 *
 * 示例：
 * addWord('bad')
 * addWord('dad')
 * addWord('mad')
 *
 * search('pad') => false
 * search('bad') => true
 * search('.ad') => true
 * search('b..') => true
 *
 * 说明：可以假设所有单词都是由小写字母 a-z 组成的。
 *
 * 解法（思路分析）：
 * 为了降低查找时的复杂度，可以考虑以字符串的长度为key，相同长度的字符串存在一个数组中，这样可以提供后续定位的效率。
 * search 既可以搜索文字， 也可以搜索正则表达式。
*/

/**
 * 构造函数
*/
const WordDictionary = function () {
  // 初始化一个对象字面量，承担Map的角色
  this.words = {}
}

/**
 * 添加字符串的方法
*/
WordDictionary.prototype.addWord = function (word) {
  // 若该字符串对应长度的数组已经存在，则只做添加
  if (this.words[word.length]) {
    this.words[word.length].push(word)
  } else {
    // 若该字符串对应长度的数组还不存在，则先创建并添加
    this.words[word.length] = [word]
  }
}

/**
 * 搜索方法
*/

WordDictionary.prototype.search = function (word) {
  // 若该字符串长度在Map中对应的数组根本不存在，则可判断字符串不存在
  if (!this.words[word.length]) return false

  // 缓存目标字符串长度
  const len = word.length

  // 如果字符串中不包含‘.’,那么一定是普通字符串
  if (!word.includes('.')) {
    // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
    return this.words[len].includes(word)
  }

  // 否则是正则表达式，要先创建正则表达式对象
  const reg = new RegExp(word)

  // 只要数组中有一个匹配正则表达式的字符串，就返回true
  return this.words[len].some(item => {
    return reg.test(item)
  })
}

const wordDictionary = new WordDictionary()
wordDictionary.addWord('bad')
wordDictionary.addWord('dad')
wordDictionary.addWord('mad')

console.log('wordDictionary.search:', wordDictionary.search('pad')
  , wordDictionary.search('bad')
  , wordDictionary.search('.ad')
  , wordDictionary.search('b..'))



/**
 * 正则表达式更进一步 ---- 字符串与数字之间的转换问题
 *
 * 题目3：
 * 请你来实现一个atoi函数，使其能将字符串转换成整数。
 * 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
 * 当我们寻找到的第一个非空字符为正或者负号时，则将该字符与之后面尽可能多的连续数字字符组合起来，作为改整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
 * 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，他们对于函数不应该造成影响。
 *
 * 注意：
 * 假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
 * 在任何情况下，若函数不能进行有效的转换时，请返回 0。
 *
 * 说明：
 * 假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[-2^31,2^31-1]。如果数值超过这个范围，请返回 INT_MAX(2^31 - 1) 或INT_MIN(-2^31)。
 *
 * 示例1：
 * 输入：'42'
 * 输出：42
 *
 * 示例2：
 * 输入：'-42'
 * 输出：-42
 * 解释：第一个非空白字符为'-'，他是一个负号。
 * 我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到-42
 *
 * 示例3：
 * 输入：'4193 with words'
 * 输出：4193
 * 解释：转换戒指于数字‘3’，因为它的下一个字符不为数字。
 *
 * 示例4：
 * 输入：'words and 798'
 * 输出：0
 * 解释：第一个非空字符是'w',但它不是数组或正、负号。因此无法执行有效的转换。
 *
 * 示例5：
 * 输入：'-91283472332'
 * 输出：-2147483648
 * 解释：数字'-91283472332'超过32位有符号整数范围，因此返回INT_MIN(-2^31)
 *
 * 解法（思路解读）：
 * 1、该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止 ---- 暗示你拿到字符串先去空格；
 * 2、当我们寻找到的第一个非空字符为正或者负号时，则将该负号与之后面尽可能多的连续数字组合起来， 作为该证书的正负号 ---- 暗示你识别开头的'+'字符和'-'字符；
 * 3、该字符串出来有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不造成影响 ---- 暗示你剪刀非整数字符就刹车；
 * 4、说明：假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[-2^31,2^31-1]。如果数值超过了这个范围，请返回 INT_MAX(2^31 - 1) 或INT_MIN(-2^31)。 ---- 明示，直接告诉你先把这俩边界值算出来，摆在那做卡口就完了。
 *
 *
 * Step1：计算卡口
 * 计算某个数的 n 次方
// 计算最大值
const max = Math.pow(2, 31) - 1
// 计算最小值
const min = -max - 1

 * Step2:解析字符串
 * 看题目中有密集的字符串约束条件，作为前端，本能的是能想到用正则来做的；同时，正则表达式本身就是前端面试中的一个基础知识点。
 * 1、该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止 ---- 允许字符串头部出现空格，但是在处理的时候要想办法把它摘出去，不要让它干扰计算；
 * 2、当我们寻找到的第一个非空字符为正或者负号时，则将该负号与之后面尽可能多的连续数字组合起来， 作为该证书的正负号 ---- 允许字符串的第一个有效字符为'+'或者'--'， 不要摘它出去，它对你的计算是有意义的。
 * 3、该字符串出来有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不造成影响 ---- 匹配的时候，连续整数之外的补费都应该被删除。
 *
 *
 * 思路：
 * 1、摘除空格
 *  方法：
 *  a、直接使用string的trim方法，它是JavaScript的一个原生法法，可以去除字符串的头尾空格；
 *  b、在匹配的时候，匹配空格（正则匹配符为\s*，意味着匹配0个或多个空格），但是“不把它放在捕获组”里 ---- 這种方式会更加通用，正则表达式匹配过程中，所有的“摘除”动作都可以通过将匹配到的结果排除在捕获组之外来实现。
 *
 * 捕获组：正则表达式中被小括号括住的部分。
 *
 * 这个字符串需要满足： “可能存在的空格+正负号+数字字符串+其他字符串”这样的格式才算合法；
 * 通过正则表达式，实现“匹配”和“提取”的双重目的：strReg
 *
 * Step3:获取捕获结果
 * 正则想法方式中，test()方法返回的是一个布尔值，单纯判断“是否匹配”。
 * 想要获取匹配的结果，需要调度match()方法：groups[1]获取捕获的结果
 *
 * Step4：判断卡口
 * 把捕获的结果转换成数字，看看是否超出了题目要求的范围。
 *
*/



// 计算最大值
const max = Math.pow(2, 31) - 1
// 计算最小值
const min = -max - 1
// 匹配 可能存在的空格+正负号+数字字符串+其他字符串
const strReg = /\s*([-\+]?[0-9]*).*/
const groups = str.match(strReg)

// 入参是一个字符串
const atoi = function (str) {
  // 编写正则表达式
  const reg = /\s*([-\+]\d*).*/

  // 得到捕获组
  const groups = str.match(reg)

  // 计算最大值
  const max = Math.pow(2, 31) - 1

  // 计算最小值
  const min = -max - 1

  // targetNum 用于存储转换出来的数字
  let targetNum = 0

  // 如果匹配成功 不成功 groups === null
  if (groups) {
    // 尝试转化捕获到的结构
    targetNum = +groups[1]
    // 注意：即便成功，也可能出现非数字的情况，比如单一个‘+’
    if (isNaN(targetNum)) {
      // 不能进行有效的转换时，请返回0
      targetNum = 0
    }
  }

  // 卡口判断
  if (targetNum > max) {
    return max
  } else if (targetNum < min) {
    return min
  }

  // 返回转换结果
  return targetNum
}

console.log('atoi:', atoi('42'), atoi('-42'), atoi('4193 with words'), atoi('words and 987'), atoi('-91283472332'))