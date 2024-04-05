//汉诺塔
function hanoi(diskCount: number, source: string, temp: string, destination: string): void {
    if (diskCount > 0) {
      hanoi(diskCount - 1, source, destination, temp);
      console.log(`Move disk from ${source} to ${destination}`);
      hanoi(diskCount - 1, temp, source, destination);
    }
  }
   
  // example
  hanoi(3, 'A', 'B', 'C');