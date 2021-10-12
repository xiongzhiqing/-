function traverse (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    console.log(arr[i])
  }
}

/**
 * for (let i = 0; i < len; i++)
 * 在所有 for 循环里，判断语句都会比递增语句多执行一次。
 * 判断语句执行次数是（i < len） n + 1
 * 递增语句执行次数是（i++） n
 *
 * 假如把总的执行次数记为 T(n): T(n) = 1 + n + 1 + (n+1) + n = 3n + 3
*/

function traverse (arr) {
  const outLen = arr.length

  for (let i = 0; i < outLen; i++) {
    const inLen = arr[i].length

    for (let j = 0; j < inLen; j++) {
      console.log(arr[i][j])
    }
  }
}

// T(n) = 1 + 1 + (n+1) + n + n + n + n*(n+1) + n*n + n*n = 3n^2 + 5n + 3

// 代码的执行次数，可以反映出代码的执行时间。


/**
 * 算法的时间复杂度，它反映的不是算法的逻辑代码到底被执行了多少次，而是随着输入规模的增大，算法对应的执行总次数的一个 “变化趋势”
 *
 * 常见的时间复杂度按从小到大
 * 1、常数时间: O(1)
 * 2、对数时间: O(logn)
 * 3、线性时间: O(n)
 * 4、线性对数时间: O(nlogn)
 * 5、二次时间: O(n^2)
 * 6、三次时间: O(n^3)
 * 7、指数时间: O(2^n)
*/

/**
 * 空间复杂度是对一个算法在运行过程中临时占用存储空间大小的亮度。和时间复杂度相似，它是内存增长的 “趋势”
 *
 * 常见的控件复杂度有
 * 1、对内存的占用量是恒定的：O(1)
 * 2、随着n的增大而增大、呈一个线性关系：O(n)、
 * 3、n*n：O(n^2)
*/