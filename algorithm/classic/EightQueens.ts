/* Generate an array containing number belows `n` */
function range(n: number): number[] {
    return Array(n)
      .fill(0)
      .map((_, i) => i);
  }
  
  /* Ensure the last queen in the passed array is safe from the other queens.*/
  function validate(queens: number[]): boolean {
    const lastPos = queens.length - 1;
    const last = queens[lastPos];
  
    return !range(lastPos).some((pos) => {
      const stepVal = queens[pos];
  
      return stepVal == last || 
             Math.abs(lastPos - pos) == Math.abs(last - stepVal);
    });
  }
  
  function findSolution(queens: number[], step: number, tableSize: number): number[] | false {
    if (step === tableSize) {
      return queens;
    } else {
      return range(tableSize)
        .map((i) => [...queens, i + 1])
        .filter((q) => validate(q))
        .reduce<number[] | false>((acc, newQueens) => {
          return acc || findSolution(newQueens, step + 1, tableSize);
        }, false);
    }
  }
  
  
  console.log(findSolution([], 0, 8)) // display `[1, 5, 8, 6, 3, 7, 2, 4]`