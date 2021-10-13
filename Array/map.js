/**
 * Map的妙用 -- 两数求和问题
 * 几乎所有的求和问题，都可以转化为求差为题
*/
// 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

const twoSum = function(nums, target) {
  const diffs = new Map()
  const len = nums.length

  for (let i =0; i < len; i++) {
    let value
    // 判断当前值对应的 target 差值是否存在（是否已遍历过）
    if ((value = diffs.get(target - nums[i])) !== undefined) {
      return [value, i]
    }
    // 若没有对应差值，则记录当前值
    diffs.set(nums[i], i)
  }
}

console.log(twoSum([2,7,11,15], 17));