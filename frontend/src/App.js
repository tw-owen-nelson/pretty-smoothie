import React from 'react';
import strawberry from './strawberry.png';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={strawberry} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2 className="mt-5">
            Hello smoothie lover!
          </h2>
        </div>
      </header>
    </div>
  );
}

export default App;
