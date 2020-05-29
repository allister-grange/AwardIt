import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import SearchBar from './components/SearchBar';
import Copyright from './components/Copyright';
import clsx from "clsx";

import axios from 'axios';

require('dotenv').config()

class CoinData {
  totalCost?: number;
  // todo change this into another object from an any
  coins?: Array<any>;

  constructor(results: any) {
//  TODO get rid of this nasty jank
    if(results){
      console.log(results.data.total_cost)

      
      this.totalCost = results.data.total_cost;
    }
}
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  searchBar: {
   paddingTop: 'calc(50vh - 150px)',
  },
  footer: {
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
    paddingBottom: '20px'
  },
}));


export default function App() {

// https://www.fullstackoasis.com/articles/2019/08/19/how-to-call-the-reddit-rest-api-using-node-js-part-i/

//https://www.reddit.com/api/v1/authorize?client_id=T6Wd6ejCgIp1Pw&response_type=code&state=poo&redirect_uri=http://localhost:8080&duration=permanent&scope=identity

  const endPoint = process.env.LAMBDA_ENDPOINT;
  const secret = process.env.REDDIT_SECRET;

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState(new CoinData(null));
  const [url, setUrl] = React.useState('');

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  const getDataFromAPI = () => {

    // const httpOptions = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Bearer ',
    //   },
    // };

    return axios.get('https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount?url=gs563k' + url);
  }
  

  //will be used for css transition
  const onSearchClick = () => {
    setIsSearching(true);
    setHasSearched(!hasSearched);

    let result = getDataFromAPI().then((result) =>{

      setData(new CoinData(result))

    }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsSearching(false);
    })
  }

  return (
    <Container  maxWidth="xl">
      <Box my={4}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          calculate reddit awards total estimated cost
        </Typography>
        <div className={classes.searchBar}>
          <SearchBar 
            value={'gs563k'} 
        //  value={url}
            onSearchClick={onSearchClick} 
            handleChange={handleChange}
            isSearching={isSearching}/>
        </div>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          {'total cost of coins is ' + data.totalCost}
        </Typography>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
