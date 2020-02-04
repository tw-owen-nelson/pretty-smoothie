import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, makeStyles, Grid } from '@material-ui/core';
import logo from '../images/logo-wordmark.png';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#ffffff',
    color: '#df1f1d',
  }, 
  tabs: {
    height: 'inherit',
  },
  logo: {
    width: '242px',
    height:'55px',
    objectFit: 'contain',
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // TabIndicatorProps={{style: {backgroundColor: "#FFFFFF"}}} 

  const handleChange = (event, newValue) => {
    localStorage.setItem('value', newValue);
    setValue(newValue);
  }

  useEffect(() => {
    const localValue = localStorage.getItem('value');
    setValue(parseInt(localValue));
  }, [value]);
  

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
                <Toolbar component={Link} to='/'><img className={classes.logo} src={logo} alt='logo' /></Toolbar>
              </Grid>
              <Grid item className={classes.tabs}> 
                <Tabs justifycontent="flex-end" value={value} onChange={handleChange}>
                  <Tab label= 'Predictor' component={Link} to='/predictor'/>
                  <Tab label='Generator'component={Link} to='/generator'/>
                </Tabs>
              </Grid>
            </ Grid>
            </AppBar>
        </div>
    )
}

export default Navbar;