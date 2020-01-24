import React from 'react';
import { Typography } from '@material-ui/core';

class Predictor extends React.Component {
    render() {
        const predictorStyle = {
            backgroundColor: '#f9faf7'
        };

        return (
            <div style={predictorStyle}>
                <Typography>Predictor View</Typography>
            </div>
        );
    }
}

export default Predictor;