import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
);