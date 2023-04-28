import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatbotComponent from './ReactOpenAI';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ChatbotComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
