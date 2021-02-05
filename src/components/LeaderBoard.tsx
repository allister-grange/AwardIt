import React from 'react';
import { Box, createStyles, Grid, Link, makeStyles, Paper, Slide, Theme, Tooltip, Typography } from '@material-ui/core';
import { CoinData } from '../types';
import LinkIcon from '@material-ui/icons/Link';

type LeaderBoardProps = {
    posts: CoinData[],
    showingLeaderBoard: boolean
}

type LeaderBoardSegmentProps = {
    message: string,
    description?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textPadding: {
            paddingTop: '25px'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
    })
);

const LeaderBoardSegment = (props: LeaderBoardSegmentProps) => {
    return (
        <div style={{
            padding: 10, flex: 4, marginLeft: 6, marginRight: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 150
        }}>
            <Typography component="div" style={{ display: 'flex', flexDirection: 'row' }}>
                <Box fontWeight="fontWeightBold" style={{ paddingRight: 2 }}>
                    {props.message}
                </Box>
                <Box style={{ paddingLeft: 2 }}>
                    {props.description}
                </Box>
            </Typography>
        </div>
    )
}

export default function LeaderBoard({ posts, showingLeaderBoard }: LeaderBoardProps) {

    const classes = useStyles();

    return (
        <Slide direction="up" in={showingLeaderBoard} timeout={1000} mountOnEnter unmountOnExit>
            <Grid
                container spacing={1}
            >

                {
                    posts.map((leaderBoardEntry, idx) => {
                        return (
                            <Grid
                                key={idx} item xl={12} xs={12} >

                                <Paper className={classes.paper} >

                                    <LeaderBoardSegment message={`#${(idx + 1).toString()}`} />
                                    <LeaderBoardSegment message={leaderBoardEntry.id} description={'id'} />
                                    <LeaderBoardSegment message={`r/${leaderBoardEntry.subReddit}`} description={'subreddit'} />
                                    <LeaderBoardSegment message={leaderBoardEntry.totalCost.toString()} description={'points'} />

                                    <div style={{ padding: 10, flex: 6, maxWidth: 150, marginLeft: 6, marginRight: 6 }}>
                                        <Link style={{ display: 'flex', justifyContent: 'center' }} href={leaderBoardEntry.permalink}
                                            rel="noopener" target="_blank">
                                            <LinkIcon />
                                            {leaderBoardEntry.id.length === 7 ? "view comment" : "view post"}
                                        </Link>
                                    </div>

                                </Paper>

                                {/* <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={(leaderBoardEntry * leaderBoardEntry.count) + " leaderBoardEntrys"}
                                    placement="top"
                                    aria-label="leaderBoardEntry price"
                                    arrow >
                                    <Paper className={classes.paper}>
                                        <Avatar alt={leaderBoardEntry.name + ' icon'} src={leaderBoardEntry.icon} />
                                        <Typography className={classes.awardCardText} variant="body1" gutterBottom>
                                            {leaderBoardEntry.count + 'x ' + leaderBoardEntry.name}
                                        </Typography>
                                    </Paper>
                                </Tooltip> */}
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Slide >
    );
}