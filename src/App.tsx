import React from "react";
import "./styles/App.css"; // Import component styles
import SortingVisualizer from "./components/SortingVisualizer.tsx";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <SortingVisualizer />
    </div>
  );
};

export default App;
