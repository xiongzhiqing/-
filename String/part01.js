/**
 * 回文字符串
 *
 * 1、回文字符串，就是正着读和倒着读都一🐱一样的字符串。例如：yessey
 * 2、如果从中间位置“劈开”，那么两边的两个子串在内容上是完全对称的。
 */
function isPalindrome1 (str) {
  // 先反转字符串
  const reversedStr = str.split('').reverse().join('')
  // 判断反转前后是否相等
  return reversedStr === str
}

function isPalindrome2 (str) {
  // 缓存字符串的长度
  const len = str.length
  // 遍历前半部分，判断和后半部分是否对称
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  }
  return true
}

// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

const validPalindrome = function (s) {
  // 缓存字符串长度
  const len = s.length

  // l、f 分别为左右指针
  let l = 0, r = len - 1

  // 当左右指针均满足对称性，一起向中间前进
  while(l < r && s[l] === s[r]) {
    l++
    r--
  }

  // 尝试判断跳过左指针元素后字符串是否回文
  if (isPalindrome(l+1, r)) {
    return true
  }

  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(l, r - 1)) {
    return true
  }
  // 工具方法，用于判断字符串是否回文
  function isPalindrome(st, ed) {
    while(st < ed) {
      if (s[st] !== s[ed]) {
        return false
      }
      st++
      ed--
    }
    return true
  }

  // 默认返回false
  return false
}

console.log(validPalindrome('aba'))
console.log(validPalindrome('abca'))
console.log(validPalindrome('abcda'))


/**
 * 真题描述： 设计一个支持以下两种操作的数据结构：
 * void addWord(word)
 * bool search(word)
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
. 可以表示任何一个字母。
*/

class WordDictionary {
  constructor() {
    // 初始化一个对象字面量，承担 Map 的角色
    this.words = {}
  }
  addWord (word) {
    // 若该字符串对应长度数组已经存在，则只做添加
    if (this.words[word.length]) {
      this.words[word.length].push(word)
    } else {
      // 若该字符串对应长度的数组还不存在，则先创建
      this.words[word.length] = [word]
    }
  }
  search (word) {
    // 若该字符串长度在Map中对应的数组根本不存在，则可判断该字符串不存在
    if (!this.words[word.length]) {
      return false
    }
    // 缓存目标字符串长度
    const len = word.length

    // 如果字符串中不包含'.',那么一定是普通字符串
    if (!word.includes('.')) {
      // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
      return this.words[len].includes(word)
    }

    // 否则是正则表达式，要先创建正则表达式对象
    const reg = new RegExp(word)
    // 只要数组中有一个匹配正则表达式的字符串， 就返回true
    return this.words[len].some(item => {
      return reg.test(word)
    })
  }
}