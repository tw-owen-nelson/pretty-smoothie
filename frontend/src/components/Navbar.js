import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Generator from './Generator';
import Predictor from './Predictor';
import Landing from './Landing';

const appbarStyle ={
  backgroundColor: '#ffffff',
  color: '#df1f1d',
};

function Navbar() {
    return (
        <div>
          <BrowserRouter>
            <AppBar position='static' style={appbarStyle}>
              <Tabs>
                <Tab label= 'Predictor' component={Link} to='/predictor'/>
                <Tab label= 'Generator'component={Link} to='/generator'/>
              </Tabs>
            </AppBar>

            <Route path="/" exact component={Landing}></Route>
            <Route path="/predictor" exact component={Predictor}></Route>
            <Route path="/generator" exact component={Generator}></Route>

          </BrowserRouter>
        </div>
    )
}

export default Navbar;