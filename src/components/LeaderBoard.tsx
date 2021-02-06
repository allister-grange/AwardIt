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
            justifyContent: 'space-around',
            width: '70%',
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
                container spacing={1} justify="center"
            >

                {
                    posts.map((leaderBoardEntry, idx) => {
                        return (
                            <Grid
                                style={{ display: 'flex', justifyContent: 'center' }} key={idx} item xl={12} xs={12}
                            >

                                <Paper className={classes.paper} >

                                    <div>
                                        <LeaderBoardSegment message={`#${(idx + 1).toString()}`} />
                                    </div>


                                    {/* <div style={{display:'flex', alignItems: 'row'}}> */}
                                    <div>
                                        <Link style={{ display: 'flex', alignItems: 'center' }} href={leaderBoardEntry.permalink}
                                            rel="noopener" target="_blank">
                                            {"This is the title of the reddit post Blah blah"}
                                            <LinkIcon />
                                            {/* {leaderBoardEntry.id.length === 7 ? "view comment" : "view post"} */}
                                        </Link>

                                        <LeaderBoardSegment message={"These are the coinnnsss"} />
                                    </div>

                                    <div>
                                        <LeaderBoardSegment message={leaderBoardEntry.totalCost.toString()} description={'points'} />
                                        <LeaderBoardSegment message={`r/${leaderBoardEntry.subReddit}`} description={'subreddit'} />
                                        <LeaderBoardSegment message={leaderBoardEntry.id} description={'id'} />
                                    </div>
                                    {/* </div> */}

                                    {/* <div style={{ padding: 10, flex: 6, maxWidth: 150, marginLeft: 6, marginRight: 6 }}>
                                    </div> */}

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