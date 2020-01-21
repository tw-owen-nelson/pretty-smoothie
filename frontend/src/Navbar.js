import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Navbar extends React.Component {

    
    render() {
    return (
        <AppBar position="static">
            <Tabs variant="fullWidth" onChange={this.handleChange}>
            <Tab value={0} label="Predictor" containerElement={<Link to="/"/>} />
            <Tab value={1} label="Generator" containerElement={<Link to="/"/>}/>
            </Tabs>
        </AppBar>
    );
    }
}

export default Navbar;