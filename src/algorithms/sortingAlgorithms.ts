export function bubbleSort(arr: number[]): number[][] {
  if (!arr || !Array.isArray(arr)) {
    console.error("bubbleSort received invalid input:", arr);
    return [];
  }

  const steps: number[][] = [];
  const sortedArr = [...arr];

  for (let i = 0; i < sortedArr.length - 1; i++) {
    for (let j = 0; j < sortedArr.length - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        steps.push([...sortedArr]);
      }
    }
  }

  return steps;
}

export function insertionSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];

  for (let i = 1; i < sortedArr.length; i++) {
    let j = i;
    while (j > 0 && sortedArr[j] < sortedArr[j - 1]) {
      [sortedArr[j], sortedArr[j - 1]] = [sortedArr[j - 1], sortedArr[j]];
      steps.push([...sortedArr]);
      j--;
    }
  }

  return steps;
}

export function selectionSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];

  for (let i = 0; i < sortedArr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < sortedArr.length; j++) {
      if (sortedArr[j] < sortedArr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [sortedArr[i], sortedArr[minIdx]] = [sortedArr[minIdx], sortedArr[i]];
      steps.push([...sortedArr]);
    }
  }

  return steps;
}

export function quickSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];

  function partition(low: number, high: number): number {
    const pivot = sortedArr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (sortedArr[j] < pivot) {
        i++;
        [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
        steps.push([...sortedArr]);
      }
    }
    [sortedArr[i + 1], sortedArr[high]] = [sortedArr[high], sortedArr[i + 1]];
    steps.push([...sortedArr]);
    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, sortedArr.length - 1);
  return steps;
}

export function mergeSort(arr: number[]): number[][] {
  const steps: number[][] = [];

  function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift()!);
      } else {
        result.push(right.shift()!);
      }
      steps.push([...result, ...left, ...right]);
    }
    return [...result, ...left, ...right];
  }

  function mergeSortHelper(array: number[]): number[] {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSortHelper(array.slice(0, mid));
    const right = mergeSortHelper(array.slice(mid));
    return merge(left, right);
  }

  mergeSortHelper(arr);
  return steps;
}

export function heapSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];

  function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && sortedArr[left] > sortedArr[largest]) {
      largest = left;
    }
    if (right < n && sortedArr[right] > sortedArr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [sortedArr[i], sortedArr[largest]] = [sortedArr[largest], sortedArr[i]];
      steps.push([...sortedArr]);
      heapify(n, largest);
    }
  }

  function buildHeap() {
    const n = sortedArr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }
  }

  buildHeap();

  for (let i = sortedArr.length - 1; i > 0; i--) {
    [sortedArr[0], sortedArr[i]] = [sortedArr[i], sortedArr[0]];
    steps.push([...sortedArr]);
    heapify(i, 0);
  }

  return steps;
}

export function bucketSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];
  const bucketCount = 5;
  const minValue = Math.min(...sortedArr);
  const maxValue = Math.max(...sortedArr);
  const bucketSize = Math.ceil((maxValue - minValue + 1) / bucketCount);

  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (const num of sortedArr) {
    const index = Math.floor((num - minValue) / bucketSize);
    buckets[index].push(num);
  }

  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
  }

  let index = 0;
  for (const bucket of buckets) {
    for (const num of bucket) {
      sortedArr[index++] = num;
      steps.push([...sortedArr]);
    }
  }

  return steps;
}

export function cocktailSort(arr: number[]): number[][] {
  const steps: number[][] = [];
  const sortedArr = [...arr];

  let swapped = true;
  let start = 0;
  let end = sortedArr.length - 1;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (sortedArr[i] > sortedArr[i + 1]) {
        [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
        steps.push([...sortedArr]);
        swapped = true;
      }
    }

    if (!swapped) break;
    swapped = false;
    end--;

    for (let i = end - 1; i >= start; i--) {
      if (sortedArr[i] > sortedArr[i + 1]) {
        [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
        steps.push([...sortedArr]);
        swapped = true;
      }
    }
    start++;
  }

  return steps;
}
