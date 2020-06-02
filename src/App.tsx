import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import SearchBar from './components/SearchBar';
import Copyright from './components/Copyright';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';

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
    // console.log(results)
  }
}

class Coin {
  coin_price: number;
  count: number;
  icon: string;
  name: string;

  constructor(coin_price: number, count: number, icon: string, name: string) {
    this.coin_price = coin_price;
    this.count = count;
    this.icon = icon;
    this.name = name;

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
      paddingTop: 'calc(50vh - 150px)',
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
      // backgroundColor: '#F5F5F5',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: "coral",
        "& $awardCardText": {
          color: "white"
        }
      },
    },
    awardCardText: {
      paddingLeft: '15px',
    },
    raisedSearchBar: {
      // paddingTop: 'calc(50vh - 150px)',
    }
  }));


export default function App() {

  //https://www.reddit.com/api/v1/authorize?client_id=T6Wd6ejCgIp1Pw&response_type=code&state=poo&redirect_uri=http://localhost:8080&duration=permanent&scope=identity

  //todo figure out env files for client side
  const lambdaEndPoint = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount?url=';
  const secret = process.env.REDDIT_SECRET;

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [displayingCoins, setDisplayingCoins] = useState(false);
  const [searchBarFocus, setIsSearchBarFocused] = useState(false);
  const [data, setData] = useState(new CoinData({
    data: {
      coins: undefined,
      total_cost: 0
    }
  }));
  const [url, setUrl] = React.useState('');

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  const highestPossiblePrice = ( apiPrice: any) => {

    const lowestCoinRatio: number = 1.99 / 500;

    let highestCostPrice = lowestCoinRatio * apiPrice

    return roundToTwoDp(highestCostPrice);
  }

  const lowestPossiblePrice = ( apiPrice: any) => {

    const highestCoinRatio: number = 99.99 / 40000;

    let lowestCostPrice = highestCoinRatio * apiPrice

    return roundToTwoDp(lowestCostPrice);
  }

  const roundToTwoDp = (input: number) => {
    return Math.round((input + Number.EPSILON) * 100) / 100
  }


  const getDataFromAPI = () => {

    // const httpOptions = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Bearer ',
    //   },
    // };

    return axios.get(lambdaEndPoint + 'ewt93j');
    // return axios.get(lambdaEndPoint + url);
  }

  const sortCoinsByDescendingPrice = (coinA: Coin, coinB: Coin) => {
    const priceA = coinA.coin_price;
    const priceB = coinB.coin_price;

    return priceB - priceA;
  }

  //will be used for css transition
  const onSearchClick = () => {
    setIsSearching(true);

    let result = getDataFromAPI().then((result) => {

      let unSortedCoins: Coin[] = Object.values(result.data.coins);
      let sortedCoins = unSortedCoins.sort(sortCoinsByDescendingPrice);

      let newCointData = {
        data: {
          total_cost: result.data.total_cost,
          coins: sortedCoins
        }
      }
      setData(new CoinData(newCointData))
      setHasSearched(true);

    }).catch((err) => {
      setData(new CoinData({
        data: {
          coins: undefined,
          total_cost: 0
        }
      }));
      console.log(err);
    })
      .finally(() => {
        setIsSearching(false);
      })
  }

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography align="center" variant="h3" component="h3" gutterBottom>
          awardit
        </Typography>
        <Typography align="center" variant="h5" component="h1" gutterBottom>
          calculate the cost of awards on a reddit post
        </Typography>
        <div className={hasSearched ? classes.raisedSearchBar : classes.searchBar}>
          <SearchBar
            // 4 awards
            // value={'gs563k'} 
            //default
            value={url}
            setIsSearchBarFocused={setIsSearchBarFocused}
            // value={'62sjuh'}
            onSearchClick={onSearchClick}
            handleChange={handleChange}
            isSearching={isSearching} />
        </div>


        <div className={classes.awardsGrid}>
          <Slide direction="up" in={hasSearched} timeout={1000} onEntered={() => setDisplayingCoins(true)} onExiting={() => setDisplayingCoins(false)} mountOnEnter unmountOnExit>
            <Grid   alignItems="center"
  justify="center"
 container spacing={3}>
              {
                data.coins?.map((coin, idx) => {
                  return (
                    <Grid key={idx} item={true} lg={2} xl={2} xs={6} sm={4} md={3}>
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={coin.coin_price + " coins"} placement="top" aria-label="coin price" arrow>

                        <Paper className={classes.paper}>
                          <Avatar alt={coin.name + ' icon'} src={coin.icon} />
                          <Typography className={classes.awardCardText} variant="body1" gutterBottom>
                            {coin.count + 'x ' + coin.name}
                          </Typography>
                        </Paper>
                      </Tooltip>

                    </Grid>
                  )
                })
              }
            </Grid>
          </Slide>
        </div>

        {
          displayingCoins ?
            <Typography align="center" variant="body1" gutterBottom>
              {'total estimated cost of coins is $' + lowestPossiblePrice(data.totalCost) + ' to $' + highestPossiblePrice(data.totalCost)}
            </Typography> :
            null
        }


        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container >
  );
}
