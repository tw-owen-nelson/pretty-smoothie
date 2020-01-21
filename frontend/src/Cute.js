import React from 'react';
import strawberry from './strawberry.png';


const Cute = () => {
    return ( 
      <div>
        <img src={strawberry} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2 className="mt-5">
            Hello smoothie lover!
          </h2>
        </div>
       </div>
    );
}

export default Cute;