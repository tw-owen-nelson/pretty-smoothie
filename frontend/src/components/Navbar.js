import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/predictor" className="item">Predictor</Link>
            <Link to="/generator" className="item">Generator</Link>
        </div>
    );
};

export default Navbar;