import React from 'react';
import { Typography } from '@material-ui/core';
import predictorImage from '../images/predictorImage.svg'

class Predictor extends React.Component {
  render() {
    return (
      <div className='side-by-side'>
        <Typography variant='h2'>
          Hey there!
        </Typography>
        <Typography>
          Tell us about your smoothie...<br/>
          We{"'"}ll show you what it{"'"}ll look like.
        </Typography>
        <div className='doodle'>
          <img src={predictorImage} alt='startup website doodle'  />
        </div>
      </div>
    );
  }
}

export default Predictor;