//快速排序
//快速排序类似归并排序,不同点是,快速排序是边分解边排序,即参照值左侧的元素项都小于参照值,参照值右侧的元素项都大于参照值,
//不必像归并排序直至分解到单个元素项后,才开始从下向上进行合并排序
function quickSort(arr: number[], left: number, right: number): void {
    let len = arr.length,
        partitionIndex,
        leftIndex = left - 1,
        rightIndex = right;
 
    if (left < right) {
        partitionIndex = partition(arr, left, right);
 
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
}
 
function partition(arr: number[], left: number, right: number): number {
    let pivot = arr[right],
        temp;
 
    while (left < right) {
        while (arr[left] <= pivot && left < right) {
            left++;
        }
 
        while (arr[right] > pivot) {
            right--;
        }
 
        if (left < right) {
            temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }
 
    arr[right] = pivot;
 
    return right;
}
 
// example
const numberse = [3, 6, 8, 10, 1, 2, 1, 4, 5, 9];
quickSort(numberse, 0, numberse.length - 1);
console.log(numberse);  // out sort arr