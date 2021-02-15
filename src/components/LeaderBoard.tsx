import React from 'react';
import { Avatar, Box, CircularProgress, createStyles, Fade, Grid, LinearProgress, Link, makeStyles, Paper, Slide, Theme, Tooltip, Typography } from '@material-ui/core';
import { LeaderBoardData } from '../types';
import { Pagination } from '@material-ui/lab';

type LeaderBoardProps = {
  posts: LeaderBoardData[],
  currentPage: number,
  pageCount: number,
  handlePageChange: any,
  displayingLeaderBoard: boolean,
  loadingLeaderBoard: boolean
}

type LeaderBoardSegmentProps = {
  message: string,
  description?: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    textPadding: {
      paddingTop: '25px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: '15px'
    },
    loadingIndicator: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      paddingBottom: '10px'
    }
  })
);

const LeaderBoardSegment = (props: LeaderBoardSegmentProps) => {
  return (
    <div style={{
      padding: 10,
    }}>
      <Typography component="div" style={{ textAlign: 'center' }}>
        <Box fontWeight="fontWeightBold" >
          {props.message}
        </Box>
        <Box style={{}}>
          {props.description}
        </Box>
      </Typography>
    </div>
  )
}

export default function LeaderBoard({ posts, currentPage, pageCount, handlePageChange,
  displayingLeaderBoard, loadingLeaderBoard }: LeaderBoardProps) {

  const classes = useStyles();

  return (
    <Slide direction="up" in={displayingLeaderBoard} timeout={1000} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <div style={{ paddingTop: '15px' }}></div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
          <Typography variant="h4" gutterBottom>
            leader board
                    </Typography>
        </div>
        {loadingLeaderBoard ?
          <div className={classes.loadingIndicator}>
            <CircularProgress color="secondary" />
          </div>
          :
          posts.map((leaderBoardEntry, idx) => {
            return (
              <Paper elevation={2} key={idx}
                style={leaderBoardEntry.highlighted ? { backgroundColor: '#ffd9b5' } : {}} className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <LeaderBoardSegment message={`#${leaderBoardEntry.position}`} />
                  </Grid>
                  <Grid item justify="center" container md={8} sm={8} xs={10} spacing={2}>
                    <Grid item sm>
                      <div style={{ padding: 10 }}>
                        <Link href={leaderBoardEntry.permalink}
                          rel="noopener" target="_blank">
                          {leaderBoardEntry.title.length > 300 ? leaderBoardEntry.title.slice(0, 300) + '...' : leaderBoardEntry.title}
                        </Link>
                      </div>
                    </Grid >
                    <Grid container justify="center" direction="row">
                      {
                        leaderBoardEntry.coins?.map((coin, idx) => (
                          <Tooltip
                            key={idx}
                            style={{ cursor: 'pointer' }}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            title={(coin.coin_price * coin.count) + " coins"}
                            placement="top"
                            aria-label="coin price"
                            arrow >
                            <div style={{ display: 'flex', flexDirection: 'row', paddingRight: '13px' }}>
                              <Typography variant="body1" gutterBottom>
                                {coin.count + 'x '}
                              </Typography>
                              <Avatar style={{ height: '20px', width: '20px' }} sizes='sm' alt={coin.name + ' icon'} src={coin.icon} />
                            </div>
                          </Tooltip>
                        ))
                      }
                    </Grid>
                  </Grid>
                  <Grid container md={3} sm={3} xs={12} justify="center" direction="row">
                    <LeaderBoardSegment message={leaderBoardEntry.totalCost.toString()} description={'points'} />
                    <LeaderBoardSegment message={`r/${leaderBoardEntry.subReddit}`} description={'subreddit'} />
                    <LeaderBoardSegment message={leaderBoardEntry.id} description={'id'} />
                    <LeaderBoardSegment
                      message={`$${lowestPossiblePrice(leaderBoardEntry.totalCost)} to $${highestPossiblePrice(leaderBoardEntry.totalCost)}`}
                      description={'estimated price'} />
                  </Grid>
                </Grid>
              </Paper>
            )
          })
        }
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <Pagination
            page={currentPage}
            count={pageCount}
            defaultPage={1}
            onChange={handlePageChange}
            variant="outlined" />
        </div>
      </div>
    </Slide>
  );
}

const highestPossiblePrice = (apiPrice: any) => {
  const lowestCoinRatio: number = 1.99 / 500;
  let highestCostPrice = lowestCoinRatio * apiPrice;
  return roundToTwoDp(highestCostPrice);
}

const lowestPossiblePrice = (apiPrice: any) => {
  const highestCoinRatio: number = 99.99 / 40000;
  let lowestCostPrice = highestCoinRatio * apiPrice;
  return roundToTwoDp(lowestCostPrice);
}

const roundToTwoDp = (input: number) => {
  return Math.round((input + Number.EPSILON) * 100) / 100
}
