import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchBar from './components/SearchBar';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import { Switch } from '@material-ui/core';

import axios from 'axios';
import AwardsDisplay from './components/AwardsDisplay';

require('dotenv').config()

class CoinData {
  totalCost?: number;
  coins?: Array<any>;

  constructor(results: any) {
    this.coins = results.data.coins;
    this.totalCost = results.data.total_cost;
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
    container: {
      height: '100%',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
    searchBar: {
      width: '100%',
      paddingTop: 'calc(50vh - 200px)',
    },
    awardsGrid: {
      flexGrow: 1,
      padding: '50px',
      paddingBottom: '0px',
      paddingTop: '25px',
      width: '100%'
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
      width: '100%',
    },
    errorText: {
      paddingTop: '25px',
      color: 'red'
    },
    textPadding: {
      paddingTop: '25px'
    }
  }));


export default function App() {

  //todo figure out env files for client side
  const redditAwardCountLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount';
  const createAwardItLeaderBoardEntryLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/createRedditLeaderboardEntry';
  const getAwardItLeaderBoardEntriesLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/getRedditLeaderboardEntries';

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [errorOnSearch, setErrorOnSearch] = useState(false);
  const [noAwardsForPost, setNoAwardsForPost] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [displayingCoins, setDisplayingCoins] = useState(false);
  const [postOrComment, setPostOrComment] = useState("post");
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

  const toggleChecked = () => {
    if (postOrComment === "post") {
      setPostOrComment("comment");
    }
    else {
      setPostOrComment("post");
    }
  };

  const highestPossiblePrice = (apiPrice: any) => {

    const lowestCoinRatio: number = 1.99 / 500;

    let highestCostPrice = lowestCoinRatio * apiPrice

    return roundToTwoDp(highestCostPrice);
  }

  const lowestPossiblePrice = (apiPrice: any) => {

    const highestCoinRatio: number = 99.99 / 40000;

    let lowestCostPrice = highestCoinRatio * apiPrice

    return roundToTwoDp(lowestCostPrice);
  }

  const roundToTwoDp = (input: number) => {
    return Math.round((input + Number.EPSILON) * 100) / 100
  }


  const getAwardCount = () => {
    return axios.get(`${redditAwardCountLambdaUrl}?url=${url}&post-or-comment=${postOrComment}`);
  }

  const createAwardItLeaderBoardEntry = (id: string, awards: Coin[], total_cost: number, permalink: string) => {

    const body = {id, awards, total_cost, permalink}

    return axios.post(`${createAwardItLeaderBoardEntryLambdaUrl}`, body);
  }

  const sortCoinsByDescendingPrice = (coinA: Coin, coinB: Coin) => {
    const priceA = coinA.coin_price;
    const priceB = coinB.coin_price;

    return priceB - priceA;
  }

  const onSearchClick = () => {

    if (url === '')
      return

    setIsSearching(true);
    setNoAwardsForPost(false);
    setErrorOnSearch(false);

    let result = getAwardCount().then((result) => {

      console.log(JSON.stringify(result))

      if (Object.keys(result.data.coins).length === 0) {
        //reset coins
        let newCointData = {
          data: {
            total_cost: result.data.total_cost,
            coins: undefined
          }
        }
        setDisplayingCoins(false)
        setData(new CoinData(newCointData))
        setNoAwardsForPost(true)
        return;
      }

      let unSortedCoins: Coin[] = Object.values(result.data.coins);
      let sortedCoins = unSortedCoins.sort(sortCoinsByDescendingPrice);

      let newCoinData = {
        data: {
          total_cost: result.data.total_cost,
          coins: sortedCoins
        }
      }
      setData(new CoinData(newCoinData));
      setHasSearched(true);
      // TODO turn this into a nice object
      let res = createAwardItLeaderBoardEntry(url, newCoinData.data.coins, 
        newCoinData.data.total_cost, result.data.permalink ).then((res) => {

          console.log(res)
        });


    }).catch((err) => {
      setData(new CoinData({
        data: {
          coins: undefined,
          total_cost: 0
        }
      }));
      setErrorOnSearch(true)
      setDisplayingCoins(false)
    })
      .finally(() => {
        setIsSearching(false);
      })
  }

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container
        style={{ height: '100%' }}
        direction="column"
        alignItems="center">

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
          <Typography align="center" variant="h3" component="h3" className={classes.textPadding} gutterBottom>
            awardit
            </Typography>
          <img className="img-responsive" src={"trophy.png"} alt="logo" style={{ height: '100px', width: '100px' }} />
        </div>
        <Typography align="center" variant="h5" component="h1" gutterBottom>
          calculate the cost of awards on a reddit post
          </Typography>

        <div className={hasSearched ? classes.raisedSearchBar : classes.searchBar}>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={12}>
              <SearchBar
                value={url}
                onSearchClick={onSearchClick}
                handleChange={handleChange}
                isSearching={isSearching} />

            </Grid>

            <Grid item xs>
              <div style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'
              }}>
                <p>post</p>
                <Switch onChange={toggleChecked} />
                <p>comment</p>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={classes.awardsGrid}>
          <AwardsDisplay
            hasSearched={hasSearched}
            data={data}
            setDisplayingCoins={setDisplayingCoins}
          />
          {
            errorOnSearch ?
              <Typography align='center' variant="body1" className={classes.errorText} gutterBottom>
                {"error on search :( I'm either broken or your search is malformed - make sure the ID of the post is in the url"}
              </Typography>
              : null
          }
          {
            noAwardsForPost ?
              <Typography align="center" variant="body1" gutterBottom className={classes.textPadding}>
                {
                  postOrComment === "post" ?
                    'no awards on that post :(' :
                    'no awards on that comment :('
                }
              </Typography> :
              null
          }
          {
            displayingCoins ?
              <Typography align="center" variant="body1" gutterBottom className={classes.textPadding}>
                {'total estimated cost of coins is $' + lowestPossiblePrice(data.totalCost) + ' to $' + highestPossiblePrice(data.totalCost)}
              </Typography> :
              null
          }
        </div>

      </Grid>
    </Container >
  );
}