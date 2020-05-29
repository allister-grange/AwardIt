import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
    // need to convert from object to array here
    this.coins = results.data.coins;
    this.totalCost = results.data.total_cost;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

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
      // paddingTop: 'calc(50vh - 150px)',
    },
    footer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      paddingBottom: '20px'
    },
    awardsGrid: {
      flexGrow: 1,
      padding: '50px',
      // paddingRight: '100px',
      // marginLeft: '100px',
      // marginRight: '100px',
      backgroundColor: '#F5F5F5',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function App() {

  // https://www.fullstackoasis.com/articles/2019/08/19/how-to-call-the-reddit-rest-api-using-node-js-part-i/

  //https://www.reddit.com/api/v1/authorize?client_id=T6Wd6ejCgIp1Pw&response_type=code&state=poo&redirect_uri=http://localhost:8080&duration=permanent&scope=identity

  //todo figure out env files for client side
  const lambdaEndPoint = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount?url=';
  const secret = process.env.REDDIT_SECRET;

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState(new CoinData({
    data: {
      coins: [],
      total_cost: 0
    }
  }));
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

    return axios.get(lambdaEndPoint + '62sjuh');
  }


  //will be used for css transition
  const onSearchClick = () => {
    setIsSearching(true);
    setHasSearched(!hasSearched);

    let result = getDataFromAPI().then((result) => {

      let newCointData = {
        data: {
          total_cost: result.data.total_cost,
          coins: Object.values(result.data.coins)
        }
      }
      setData(new CoinData(newCointData))
    }).catch((err) => {
      console.log(err);
    })
      .finally(() => {
        setIsSearching(false);
      })
  }

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          calculate reddit awards total estimated cost
        </Typography>
        <div className={classes.searchBar}>
          <SearchBar
          // 4 awards
            // value={'gs563k'} 
            //default
            //  value={url}

            value={'62sjuh'}
            onSearchClick={onSearchClick}
            handleChange={handleChange}
            isSearching={isSearching} />
        </div>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          {'total cost of coins is ' + data.totalCost}
        </Typography>

        <div className={classes.awardsGrid}>
          <Grid container spacing={3}>
            {
              data.coins?.map((coin, idx) => {
                return (

                  <Grid item={true} lg={2} xl={2} xs={6} sm={4} md={3}>
                    <Paper className={classes.paper}>
                      <Typography key={idx} align="center" variant="body1" gutterBottom>
                        {coin.name}
                      </Typography>
                    </Paper>
                  </Grid>

                )
              })
            }
          </Grid>
        </div>

        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
