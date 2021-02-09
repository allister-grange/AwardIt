import React from 'react';
import { Avatar, Box, createStyles, Fade, Grid, Link, makeStyles, Paper, Theme, Tooltip, Typography } from '@material-ui/core';
import { CoinData } from '../types';
import { Pagination } from '@material-ui/lab';

type LeaderBoardProps = {
    posts: CoinData[],
    currentPage: number,
    pageCount: number,
    handlePageChange: any
}

type LeaderBoardSegmentProps = {
    message: string,
    description?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
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

export default function LeaderBoard({ posts, currentPage, pageCount, handlePageChange }: LeaderBoardProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                posts.slice(0, 9).map((leaderBoardEntry, idx) => {
                    return (
                        <Paper key={idx} className={classes.paper}>
                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <LeaderBoardSegment message={`#${(idx + 1).toString()}`} />
                                </Grid>
                                <Grid item justify="center" container md={8} sm={8} xs={11} spacing={2}>
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
    );
}