import React from 'react';
import jumpImage from '../images/jumpImage.svg';
import swingImage from '../images/swingImage.svg'

function Doodle(props) {
  return (
    <div className='doodle'>
      <img src={props.stage ? swingImage : jumpImage} alt='startup website doodle' />
    </div>
  );
}

export default Doodle;