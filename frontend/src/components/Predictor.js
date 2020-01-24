import React from 'react';
import { Typography } from '@material-ui/core';
import predictorImage from '../images/predictorImage.svg'

class Predictor extends React.Component {
  render() {
    return (
      <div className='side-by-side'>
        <div className='text-content'>
          <h2>Hey there!</h2>
          <p>
            Tell us about your smoothie...<br/>
            We{"'"}ll show you what it{"'"}ll look like.
          </p>
          <form>
            <input type='radio' name='ingredient' value='1'/>
            <input type='radio' name='ingredient' value='2'/>
            <input type='radio' name='ingredient' value='3'/>
            <br/>
            <input type='submit' value='SHOW ME MY SMOOTHIE' className='smoothie-button'/>
          </form>
        </div>
        <div className='doodle'>
          <img src={predictorImage} alt='startup website doodle'  />
        </div>
      </div>
    );
  }
}

export default Predictor;