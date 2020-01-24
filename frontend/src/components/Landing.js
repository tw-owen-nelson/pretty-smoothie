import React from 'react';
import strawberry from '../images/strawberry.png';
import '../App.css';



const Cute = () => {
    return ( 
      <div className="App-header">
        <img src={strawberry} className="App-logo" alt="logo" />
        <div className="pp-intro">
          <h2 className="mt-5">
            Hello smoothie lover!
          </h2>
        </div>
       </div>
    );
}

export default Cute;