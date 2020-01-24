import React from 'react';
import { Typography } from '@material-ui/core';

class Generator extends React.Component {
    render() {
        const generatorStyle = {
            backgroundColor: '#f9faf7'
        };

        return (
            <div style={generatorStyle}>
                <Typography>Generator View</Typography>
            </div>
        );
    }
}

export default Generator;