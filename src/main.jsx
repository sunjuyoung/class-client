import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./context/AuthProvider";
import { TagProvider } from "./context/TagProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TagProvider>
      <App />
      </TagProvider>
      </AuthProvider>
  </React.StrictMode>
);
