import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Grid } from '@material-ui/core';
import logo from '../images/logo-wordmark.png';
import Predictor from './Predictor.js';
import Generator from './Generator.js';
import Landing from './Landing.js';

const shouldRender = viewToRender => {
    if(viewToRender === 'predictor'){ 
        return <Predictor/> 
    }
    else if(viewToRender === 'generator'){ 
        return <Generator/> 
    }
    else { 
        return <Landing/> 
    }
}

function SimpleTabs(props) {
    const { changeView, showIndicator } = props;
    const [currentValue, setCurrentValue] = useState(2);

     const handleChange = (event, newValue) => {
         setCurrentValue(newValue)
     }

    return (
        <Tabs 
            value={currentValue}
            onChange={handleChange} 
            TabIndicatorProps={{style: { background: showIndicator }}}
        >       
            <Tab onClick={() => changeView('predictor', '#df1f1d')}
                label={<span style={{ color: '#df1f1d' }}>Predictor</span>}></Tab>
            <Tab onClick={() => changeView('generator', '#df1f1d')}
                label={<span style={{ color: '#df1f1d' }}>Generator</span>}></Tab>
            <Tab disabled={true} style={{display: 'none'}}></Tab>

        </Tabs>
    )
}

class NavBar extends React.Component {
    constructor(){
        super();
        this.state = {
            view : 'landing',
            showIndicator: 'none'
        };
    }

    changeView = (viewName, indicatorFlag) => {
        this.setState({view: viewName});
        this.setState({showIndicator: indicatorFlag});
    }

    render(){
        return (
            <div>
                <AppBar position='static' color='inherit'>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                    >
                        <Grid item>
                            <Toolbar onClick={() => this.changeView('landing', 'none')}><img src={logo} alt='logo'/></Toolbar>
                        </Grid>
                        <Grid item>
                            <SimpleTabs changeView={this.changeView} showIndicator={this.state.showIndicator}/>
                        </Grid>

                    </Grid>
                </AppBar>
                {shouldRender(this.state.view)}
            </div>
        )
        
    }
}


export default NavBar;
