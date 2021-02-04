import React from 'react';
import { Typography } from '@material-ui/core';

export default function Header() {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
                <Typography align="center" variant="h3" component="h3" style={{paddingTop: '25px'}} gutterBottom>
                    awardit
                </Typography>
                <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
            </div>
            <Typography align="center" variant="h5" component="h1" gutterBottom>
                calculate the cost of awards on a reddit post
            </Typography>
        </>
    );
}