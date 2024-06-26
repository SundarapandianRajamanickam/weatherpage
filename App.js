import React from 'react';
import './App.css';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main className="main-content">
        <Weather />
      </main>
    </div>
  );
}

export default App;
