import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './components/SearchBar';
import { Switch } from '@material-ui/core';

import AwardsDisplay from './components/AwardsDisplay';
import Header from './components/Header';
import SearchResponses from './components/SearchResponses';
import { createAwardItLeaderBoardEntry, getAwardCountForId, getAwardItLeaderBoardEntries } from './services/lambda';
import { Coin, CoinData } from './types';
import LeaderBoard from './components/LeaderBoard';

require('dotenv').config()

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

  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [errorOnSearch, setErrorOnSearch] = useState(false);
  const [noAwardsForPost, setNoAwardsForPost] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [displayingCoins, setDisplayingCoins] = useState(false);
  const [postOrComment, setPostOrComment] = useState("post");
  const [leaderBoardData, setLeaderBoardData] = useState([] as CoinData[]);
  const [displayingLeaderBoard, setDisplayingLeaderBoard] = useState(true);
  const [data, setData] = useState(new CoinData({
    data: {
      coins: undefined,
      total_cost: 0
    }
  }));
  const [url, setUrl] = React.useState('');

  useEffect(() => {
    console.log("data changed!!");

    // I have a race condition here between this and pushResultToLeaderBoards
    getAwardItLeaderBoardEntries()
      .then(res => {

        const sortedLeaderBoardData = res.sort((a,b) => b.totalCost-a.totalCost);

        setLeaderBoardData(sortedLeaderBoardData);
      })
      .catch(err => console.error(err))

  }, [data]);

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

  const pushResultToLeaderboards = ({ id, coins, totalCost, permalink, subReddit }: CoinData) => {
    createAwardItLeaderBoardEntry(id, coins,
      totalCost, permalink, subReddit)
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onSearchClick = () => {

    if (url === '')
      return

    setIsSearching(true);
    setNoAwardsForPost(false);
    setErrorOnSearch(false);

    getAwardCountForId(url, postOrComment)
      .then(result => {

        if (result.coins.length === 0) {
          // TODO see if I can get rid of these state options
          setDisplayingCoins(false);
          setNoAwardsForPost(true);
          return
        }

        setData(result);
        setHasSearched(true);
        pushResultToLeaderboards(result);

      })
      .catch(err => {
        setData(new CoinData({
          data: {
            coins: undefined,
            total_cost: 0,
            permalink: undefined,
            id: undefined
          }
        }));
        setErrorOnSearch(true);
        setDisplayingCoins(false);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container
        style={{ height: '100%' }}
        direction="column"
        alignItems="center">

        <Header />

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
            <Grid item xs>
              <div style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'
              }}>
                <p>show leader board</p>
                <Switch onChange={() => setDisplayingLeaderBoard(!displayingLeaderBoard)} />
                {/* todo if the above is toggled, then change text to 'hide leaderboard */}
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

          <SearchResponses
            errorOnSearch={errorOnSearch}
            noAwardsForPost={noAwardsForPost}
            displayingCoins={displayingCoins}
            postOrComment={postOrComment}
            data={data}
          />

          <LeaderBoard 
            posts={leaderBoardData}
            showingLeaderBoard={displayingLeaderBoard}
          />

        </div>

      </Grid>
    </Container >
  );
}