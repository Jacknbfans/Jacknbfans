//归并排序
//把原始数组切分成若干个小数组,直至小数组只有一个元素项,然后再把小数组归并成比较大的数组,直至最后合并成大数组
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
 
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let i = 0, j = 0;
 
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
 
    while (i < left.length) {
        result.push(left[i++]);
    }
 
    while (j < right.length) {
        result.push(right[j++]);
    }
 
    return result;
}
 
// example
const unsortedArrays = [4, 3, 2, 10, 12, 1, 5, 6];
const sortedArrays = mergeSort(unsortedArrays);
console.log(sortedArrays);  // out: [1, 2, 3, 4, 5, 6, 10, 12]