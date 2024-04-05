//选择排序
//首先找到数组里最小值后放到第一位上,接着找第二小值放到第二位上,以此类推
function selectionSort<T>(arr: T[]): T[] {
    const len = arr.length;
    if (len <= 1) {
      return arr;
    }
   
    let minIndex = 0;
    for (let i = 1; i < len; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
    }
   
    const temp = arr[minIndex];
    arr[minIndex] = arr[0];
    arr[0] = temp;
   
    return [...arr.slice(1), ...selectionSort(arr.slice(1))];
  }
   
  // example
  const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const sortedNumbers = selectionSort(numbers);
  console.log(sortedNumbers); // out sort arr