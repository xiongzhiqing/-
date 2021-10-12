//  空间换时间，Map来帮忙

// ***** 几乎所有的求和问题，都可以转化为 “求差问题”。
let nums = [2, 7, 11, 15], target = 9
/**
 * 题目1：
 * 给定一个整数数组 nums 和一个目标值target，请你在该数组中找出和为目标值的那两个整数，并返回题目的下标。
 * 可以假设每种输入只会对应一个答案，但是，不能重复利用这个数组中同样的元数。
 *
 * 示例：给定nums = [2,7,11,15] target = 9
 * 因为num[0] + num[1] = 2 + 7 = 9 所以返回 [0, 1]
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {numter[]}
 */
const twoSum = function (nums, target) {
  // 用对象来模拟map的能力
  const diffs = {}
  // 缓存数据长度
  const len = nums.length

  for (let i = 0; i < len; i++) {
    // 判断当前值对应的target差值是否存在（是否已遍历过）
    if (diffs[target - nums[i]] !== undefined) {
      // 若有对应差值，那么答案get！
      return [diffs[target - nums[i]], i]
    }
    // 若没有对应差值，则记录当前值
    diffs[nums[i]] = i
  }
}

console.log('twoSum:', twoSum(nums, target))

/**
 * Map版实现
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {numter[]}
 */
const twoSumMap = function (nums, target) {
  const map = new Map()

  const len = nums.length

  for (let i = 0; i < len; i++) {
    if (map.get(target - nums[i]) !== undefined) {
      return [map.get(target - nums[i]), i]
    }
    map.set(nums[i], i)
  }
}

console.log('twoSumMap:', twoSumMap(nums, target))


// ****** 强大的双指针法
// 1、可以空间换时间
// 2、降低问题的复杂度
// 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是： 该数组必须有序。否则双指针根本无法帮我们缩小定位的范围，压根没有意义。

let nums1 = [1, 2, 3, 0, 0, 0], m = 3
let nums2 = [2, 5, 6], n = 3

/**
 * 题目2：
 * 给你两个有序整数数组 nums1 和 nums2， 请你将 nums2 和并到 nums1 中，使num1称为一个有序数组。
 *
 * 说明：初始化nums1和nums2的元数数量分别为 m 和 n。你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 *
 * 示例：
 * 输入：
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6], n = 3
 * 输入：
 * [1,2,2,3,5,6]
 *
 * 解法：（双指针法）
 * 首先定义两个指针，各指向两个数组生效部分的尾部；
 * 每次只对指针所指的元素进行比较。取其中较大的元素，把它从nums1的末尾往前面填补；
 *
 * 由于nums1的有效部分和nums2并不一定是一样长的。还需要考虑其中一个提前到头的這种情况：
 *  1、如果提前遍历完的是 nums1的有效部分，剩下的是nums2。那么这意味着nums1的头部空出来了， 直接把nums2整个补到nums1前面去即可。
 *  2、如果提前遍历完的是 nums2， 剩下的是nums1。由于容器本身就是nums1，所以此时不必做任何额外的操作。
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
*/
const merge = function (nums1, m, nums2, n) {
  nums1 = nums1.slice(0)
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1, j = n - 1, k = m + n - 1

  // 当两个数组都没遍历完时，指针同步移动
  while (i >= 0 && j >= 0) {
    // 取较大值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      i--
    } else {
      nums1[k] = nums2[j]
      j--
    }
    k--
  }
  // nums2 留下的情况， 特殊处理一下
  while (j > 0) {
    nums1[k] = nums2[j]
    j--
    k--
  }
}
merge(nums1, m, nums2, n)
console.log(nums1)


const merge1 = function (nums1, m, nums2, n) {
  console.log(nums1, nums2, m, n)
  nums1.splice(m);
  nums2.splice(n);
  console.log(nums1, nums2, m, n)
  return [...nums1, ...nums2].sort((a, b) => a - b);
}
console.log('merge1 -> js写法：', merge1(nums1, m, nums2, n))
// 三数求和问题

nums = [-1, 0, 1, 2, -1, -4]

/**
 * 题目3：
 * 给你一个包含 n 个整数的数组 nums，判断nums中是否存在三个元素 a, b, c. 使得 a + b + c = 0 ? 请你找出所有满足条件且不重复的三元组。
 *
 * 注意：答案中不可包含重复的三元组。
 *
 * 示例：
 * 给定数组 nums = [-1, 0, 1, 2,-1,-4]，满足要求的三元组结合为 [[-1, 0, 1], [-1,-1,2]]
 *
 * 解法：
 * 三数之和延续两数之和的思路，可以把求和问题编程求差问题 -- 固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数下家等于 0 的。
 *
 * 1、第一步排序。
 * 2、对数组进行遍历，每次遍历哪个数字，就固定哪个数字。然后把左指针指向该数字后面一个坑里的数字，把右指针指向数组末尾，让左右指针从起点开始，想中间前进。
 *  每次指针移动一次位置， 就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于 0。如果是，那么我们就得到了一个目标组合；否则，分两种情况来看：
 *  a、相加之和大于 0， 说明右侧的数变大了， 右指针左移
 *  b、相加之和小于 0，说明左侧的数变小了，左指针右移
*/

const threeSum = function (nums, sum = 0) {
  // 用于存放结果数组
  let res = []
  // 目标值为 0
  sum = sum

  // 1、给nums排序
  nums = nums.sort((a, b) => a - b)

  // 缓存数组长度
  const len = nums.length

  // 遍历到倒数第三个数就足够了， 因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1

    // 右指针 k
    let k = len - 1

    // 如果遇到重复的数字， 则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    while (j < k) {
      // 2、三数之和小于0， 左指针前进（++）
      if (nums[i] + nums[j] + nums[k] < sum) {
        j++
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
      } else if (nums[i] + nums[j] + nums[k] > sum) {
        // 三数之和大于0，右指针左后退（--）
        k--
        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      } else {
        // 得到目标数字组合， 推入结果数组
        res.push([nums[i], nums[j], nums[k]])

        // 左右指针一起前进
        j++
        k--

        // 若左指针元素重复， 则跳过
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
        // 若右指针元素重复，则跳过
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      }
    }
  }

  // 返回结果数组
  return res
}

console.log('threeSum:', threeSum(nums, -3))



// ***** 双指针法中的“对撞指针”法：左右指针一起从两边往中间位置相互迫近，这样的特殊双指针形态，被称为“对撞指针”。
// 使用场景：关键字---- “有序”、“数组”


// 对撞指针 可以帮助我们缩小问题的范围，因为数组有序，所以可以用两个指针“画地为牢”圈出一个范围，这个范围以外的值不是太大就是太小，直接被排除在我们的逻辑之外，这样我们就可以把时间花在真正有意义的计算和对比上。如此一来， 不仅节省了计算的时间， 更降低了问题本身的复杂度。