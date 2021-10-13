/**
 * 强大的双指针法
*/
// 1、合并两个有序数组
// 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引 k
  let i =  m - 1, j = n - 1, k = m + n - 1

  // 当两个数组都没有遍历完时，指针同步移动
  while(i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      i--
    } else {
      // nums2 大于nums1 同指针处值，把大值放入nums1的最新 k 位置
      nums1[k] = nums2[j]
      j--
    }
    k--
  }

  // 如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可。
  // nums2 留下的情况，特殊处理一下
  while(j > 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
  console.log(nums1);
}

merge([1, 2, 3, 8], 4, [1, 2, 4, 5, 6,  9], 6)


// 2、三数求和问题
// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

const nums = [-1, 0, 1, 2, -1, -4]
// 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

const threeSum = function (nums) {
  // 用于存放结果数组
  let res = []

  // **** 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。
  // 给 nums 排序
  nums = nums.sort((a, b) => a - b)

  // 缓存数组长度
  const len = nums.length

  // **** 遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for(let i = 0; i < len - 2; i++) {
    // 左指针 l
    let l = i + 1
    // 右指针 r
    let r = len - 1
    // 如果遇到重复的数组，则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    while (l < r) {
      // 计算相加之和
      const sum = nums[i] + nums[l] + nums[r]
      if (sum < 0) {
        // 三数之和小于 0，左指针前进
        l++
        // 处理左指针元素重复的情况(和前一个元素比较)
        while(l < r && nums[l] === nums[l - 1]) {
          l++
        }
      } else if (sum > 0) {
        // 三数之和大于 0，右指针前进
        r--
        // 处理右指针元素重复的情况（和后一个元素比较）
        while(l < r && nums[r] === nums[r + 1]) {
          r--
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[l], nums[r]])
        // 左右指针一起前进
        l++
        r--
        // 若左指针元素重复，跳过
        while (l < r && nums[l] === nums[l - 1]) {
          l++
        }
        // 若右指针元素重复，跳过
        while (l < r && nums[r] === nums[r + 1]) {
          r--
        }
      }
    }
  }
  return res
}

console.log(threeSum(nums));