import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function Header() {
    return (
        <Grid container justify="center">
            <Grid container direction="row" justify="center">
                <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
                <Typography align="center" variant="h4" component="h4" style={{paddingTop: '25px'}} gutterBottom>
                    awardit
                </Typography>
                <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
            </Grid>
            <Typography align="center" variant="h5" component="h1" gutterBottom>
                calculate the cost of awards on a reddit post
            </Typography>
        </ Grid>
    );
}