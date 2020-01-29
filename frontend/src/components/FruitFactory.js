import React from 'react';

function FruitFactory(props) {
  switch(props.name) {
    case 'banana':
      return <img src={'/media/banana.png'} alt='banana icon'/>;
    case 'blueberry':
      return <img src={'/media/blueberry.png'} alt='blueberry icon'/>;
    case 'strawberry':
      return <img src={'/media/strawberry.png'} alt='strawberry icon'/>;
    default:
      return <></>;
  }
}

export default FruitFactory;