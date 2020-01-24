import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Generator from './components/Generator';
import Predictor from './components/Predictor';
import Landing from './components/Landing';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Route path='/' exact component={Landing}></Route>
        <Route path='/predictor' exact component={Predictor}></Route>
        <Route path='/generator' exact component={Generator}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
