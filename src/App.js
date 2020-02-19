import React from 'react';
import logo from './logo.svg';
import Quiz from './Quiz.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <Quiz />
    </div>
  );
}

export default App;
