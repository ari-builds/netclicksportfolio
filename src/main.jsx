import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  rootElement.innerHTML = '<h1 style="color: red; padding: 20px;">React is attempting to load...</h1>';
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  if (rootElement) {
    rootElement.innerHTML = `<h1 style="color: red; padding: 20px;">Render Error: ${err.message}</h1>`;
  }
}
