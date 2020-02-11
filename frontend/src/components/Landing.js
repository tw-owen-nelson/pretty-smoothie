import React from 'react';
import strawberry from '../images/landingStrawberry.png';

const Cute = () => {
  return (
    <div className="App-header">
      <img src={strawberry} className="App-logo" alt="strawberry" />
      <div className="App-intro">
        <h2>
          Hello smoothie lover!
        </h2>
      </div>
     </div>
  );
}

export default Cute;