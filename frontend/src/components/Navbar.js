import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';
import logo from '../images/logo-wordmark.png';

const appbarStyle = {
  backgroundColor: '#ffffff',
  color: '#df1f1d',
};

const tabStyle = {
  marginLeft: 1300
};

function Navbar() {
    return (
        <div>
            <AppBar position='static' style={appbarStyle}>
            <Toolbar><img src={logo} alt='logo' /></Toolbar>
              <Tabs style={tabStyle}>
                <Tab label= 'Predictor' component={Link} to='/predictor'/>
                <Tab label= 'Generator'component={Link} to='/generator'/>
              </Tabs>
            </AppBar>
        </div>
    )
}

export default Navbar;