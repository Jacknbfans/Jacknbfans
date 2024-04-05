//插入排序
//把数组分已排序区域和未排序区域,将未排序区域的元素项和已排序的区域的元素比较大小,确定要插入的位置并插入
function insertionSort(array: number[]): void {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
 
        // move elements
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
 
        // insert elements
        array[j + 1] = key;
    }
}
 
// example
const arr = [10, 2, 9, 3, 8, 4, 7, 5, 6];
insertionSort(arr);
console.log(arr); // out sort arr