import React, { useState, useEffect } from "react";
import DotCanvas from "./DotCanvas";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  heapSort,
  bucketSort,
  cocktailSort,
} from "../algorithms/sortingAlgorithms";

// Define sorting function type
type SortingAlgorithm = (arr: number[]) => number[][];

// Explicitly define sorting algorithms mapping
const algorithms: Record<string, SortingAlgorithm> = {
  "Bubble Sort": bubbleSort,
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
  "Heap Sort": heapSort,
  "Bucket Sort": bucketSort,
  "Cocktail Sort": cocktailSort,
};

const SORT_SPEED = 50;
const ARRAY_SIZE = 50;

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm | null>(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * 100)
    );
    console.log("🔄 Generated new array:", newArray);
    setArray(newArray);
  };

  const handleAlgorithmSelection = (algorithmName: string) => {
    const algo = algorithms[algorithmName];
    if (!algo) {
      console.error("❌ Invalid algorithm selected:", algorithmName);
      return;
    }
    console.log(`✅ Algorithm selected: ${algorithmName}`);
    setSelectedAlgorithm(() => algo); // Ensure state updates properly
  };

  const startSorting = async () => {
    if (isSorting) {
      console.warn("⚠ Sorting is already in progress.");
      return;
    }
    if (!selectedAlgorithm) {
      console.error("❌ No algorithm selected!");
      return;
    }
    if (array.length === 0) {
      console.error("❌ Array is empty!");
      return;
    }

    setIsSorting(true);

    console.log(`▶️ Starting sorting with algorithm:`, selectedAlgorithm.name);
    console.log("📊 Initial array:", array);

    const steps = selectedAlgorithm([...array]);

    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      console.error("❌ Sorting function returned an invalid result:", steps);
      setIsSorting(false);
      return;
    }

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, SORT_SPEED));
      setArray(steps[i]);
    }

    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-text">
      <h1 className="text-3xl font-bold text-primary mt-6">Sorting Algorithm Visualizer</h1>

      {/* Control Buttons */}
      <div className="flex gap-4 my-4">
        <button
          className="bg-primary px-4 py-2 rounded-md text-white shadow-lg hover:scale-105 transition"
          onClick={resetArray}
          disabled={isSorting}
        >
          Generate New Array
        </button>
        <button
          className="bg-success px-4 py-2 rounded-md text-white shadow-lg hover:scale-105 transition"
          onClick={startSorting}
          disabled={isSorting || !selectedAlgorithm}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
      </div>

      {/* Sorting Algorithm Selection */}
      <div className="grid grid-cols-3 gap-3 my-4">
        
        {Object.keys(algorithms).map((name) => (
          <button
            key={name}
            className={`px-4 py-2 rounded-md text-white shadow-md transition ${
              selectedAlgorithm === algorithms[name]
                ? "bg-warning scale-105"
                : "bg-secondary"
            }`}
            onClick={() => handleAlgorithmSelection(name)}
            disabled={isSorting}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Sorting Visualization */}
      <DotCanvas array={array} />

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-sm">
        Built by Ethan | Open Source on{" "}
        <a
          href="https://github.com/yourgithubrepo"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default SortingVisualizer;
