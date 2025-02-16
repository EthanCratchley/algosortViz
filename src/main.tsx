import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Tailwind *first* so it can be overridden by your custom CSS
import "./styles/index.css";   // <-- includes @tailwind directives
import "./styles/globals.css"; // optional global styles
import "./styles/App.css";     // optional component-specific styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
