import React from 'react';
import { Router, Route } from 'react-router-dom';
import strawberry from './strawberry.png';
import './App.css';
import Navbar from './Navbar';
import history from './history'
import Generator from './Generator';
import Predictor from './Predictor';

function App() {
  return (
    <div className="App">

      <Router history={history} >
      <Navbar />
            <div>
                <Route path="/" exact component={Predictor}></Route>
                <Route path="/generator" exact component={Generator}></Route>

            </div>

      </Router>
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
