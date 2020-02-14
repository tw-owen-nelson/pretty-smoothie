import React from 'react';
import strawberry from '../images/landingStrawberry.png';
import { Typography } from '@material-ui/core';

const Cute = () => {
  return (
    <div className="App-header">
      <img src={strawberry} className="App-logo" alt="strawberry" />
      <div className="App-intro">
        <Typography variant='h2'>
          Hello smoothie lover!
        </Typography>
      </div>
     </div>
  );
}

export default Cute;