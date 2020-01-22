import React from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import history from './history'
import Generator from './components/Generator';
import Predictor from './components/Predictor';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <Router history={history} >
      <Navbar />
            <div>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/predictor" exact component={Predictor}></Route>
                <Route path="/generator" exact component={Generator}></Route>
            </div>
      </Router>
    </div>
  );
}

export default App;
