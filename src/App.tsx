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

  const endPoint = "https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount";
  const secret = "WHYkZl9qvedilsa1FiekC2bp8RY"

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [url, setUrl] = React.useState('');

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  const getAccessToken = () => {



    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('T6Wd6ejCgIp1Pw' + ':' + 'SByH77LyvnGGERLZeJioCtkVF0s'),
      },
    };
  
    const grantType = 'authorization_code';
    const code = 'yiU8hr9631O6KWkUZ7amlC2TxAI';
    const redirectUri = 'http://localhost:8080';
    const postdata = `grant_type=${grantType}&code=${code}&redirect_uri=${redirectUri}`;
  
    return axios.post('https://www.reddit.com/api/v1/access_token', postdata, httpOptions);
  }
  

  //will be used for css transition
  const onSearchClick = () => {
    console.log(isSearching)
    setHasSearched(!hasSearched);
    setIsSearching(!isSearching);

    let result = getAccessToken().then((result) =>{
      console.log(result)
    })
  }

  useEffect(() => {
    // axios.get(endPoint)
    //   .then(res => {
    //     const persons = res.data;
    //     console.log(persons)
    //   })
  
   
  });

  return (
    <Container  maxWidth="xl">
      <Box my={4}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          calculate reddit awards total estimated cost
        </Typography>
        <div className={classes.searchBar}>
          <SearchBar 
            value={url} 
            onSearchClick={onSearchClick} 
            handleChange={handleChange}
            isSearching={isSearching}/>
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
