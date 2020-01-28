import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';
import logo from '../images/logo-wordmark.png';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#ffffff',
    color: '#df1f1d',
  }
  
}));

function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

    return (
        <div>
            <AppBar position='static' className={classes.appbar}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
            >
              <Grid item>
                <Toolbar><img src={logo} alt='logo' /></Toolbar>
              </Grid>
              <Grid item>
                <Tabs justifycontent="flex-end" value={value} onChange={handleChange}>
                  <Tab value={0} label= 'Predictor' component={Link} to='/predictor'/>
                  <Tab value={1} label='Generator'component={Link} to='/generator'/>
                </Tabs>
              </Grid>
            </ Grid>
            </AppBar>
        </div>
    )
}

export default Navbar;