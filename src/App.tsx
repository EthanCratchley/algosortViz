// src/App.tsx
import React, { useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import "./styles/index.css";   // Tailwind directives + minimal resets
import "./styles/globals.css"; // Global styles & font
import "./styles/App.css";     // Your component-specific styles (if any)

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    // The "dark" class here activates dark variants in Tailwind.
    <div className={darkMode ? "dark" : ""}>
      {/* This outer container fills the entire viewport */}
      <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
        
        {/* HEADER: full width, button aligned to the right */}
        <header className="w-full flex justify-end p-4 bg-gray-200 dark:bg-gray-800">
          <button
            onClick={toggleDarkMode}
            className="bg-primary px-4 py-2 rounded-md text-white shadow-lg transition hover:scale-105"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        {/* MAIN: grows to fill available space */}
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Sorting Algorithm Visualizer</h1>
          <SortingVisualizer />
        </main>

        {/* FOOTER: full width, at the bottom */}
        <footer className="w-full p-4 bg-gray-200 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Built by Ethan | Open Source on{" "}
            <a
              href="https://github.com/yourgithubrepo"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
