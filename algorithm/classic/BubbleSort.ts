//冒泡排序
//比较相邻的两个元素项大小,若前一个大于后一个则交换,  目的使元素项向后(上)移动至正确位置

function bubbleSort(arr: number[]): number[] {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              // switch arr[j] 和 arr[j + 1]
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
      }
  }
  return arr;
}

// Example
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log(sortedArray); // out: [11, 12, 22, 25, 34, 64, 90]