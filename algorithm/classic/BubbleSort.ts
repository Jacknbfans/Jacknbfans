function bubbleSort(arr: number[]): number[] {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              // 交换 arr[j] 和 arr[j + 1]
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
      }
  }
  return arr;
}

// 使用示例
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]