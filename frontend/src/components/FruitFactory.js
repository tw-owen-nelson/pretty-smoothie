import React from 'react';
import banana from '../images/banana.png'
import blueberry from '../images/blueberry.png'
import strawberry from '../images/strawberry.png'
// https://stackoverflow.com/questions/45334874/load-images-based-on-dynamic-path-in-reactjs
function FruitFactory(props) {
  switch(props.name) {
    case 'banana':
      return <img src={banana} alt='banana icon'/>;
    case 'blueberry':
      return <img src={blueberry} alt='blueberry icon'/>;
    case 'strawberry':
      return <img src={strawberry} alt='strawberry icon'/>;
    default:
      return <></>;
  }
}

export default FruitFactory;