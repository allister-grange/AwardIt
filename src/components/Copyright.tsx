import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import clsx from "clsx";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    footer: {
      position:'absolute',
      left:0,
      bottom:0,
      right:0,
      paddingBottom: '20px'
    },
  }));
  

export default function Copyright() {

    const classes = useStyles();
  
    return (
        <Typography className='footer' variant="body2" color="textSecondary" align="center">
          {'using estimates from the cheapest and most expensive bundles found on '}
          <Link color="secondary" href="https://www.reddit.com/coins/">
              {'reddit'}
          </Link>
          <br /> 
          {'made by Allister Grange '}
         
        </Typography>
    );
  }
