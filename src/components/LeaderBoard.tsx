import React from 'react';
import { createStyles, Grid, Link, makeStyles, Paper, Slide, Theme, Tooltip, Typography } from '@material-ui/core';
import { CoinData } from '../types';

type LeaderBoardProps = {
    posts: CoinData[],
    showingLeaderBoard: boolean
}

type LeaderBoardSegmentProps = {
    message: string
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
        },
    })
);

const LeaderBoardSegment = (props: LeaderBoardSegmentProps) => {
    return (
        <Paper style={{ padding: 10, flex: 4 }}>
            <Typography>
                {props.message}
            </Typography>
        </Paper>
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

                                <Paper className={classes.paper}
                                    style={idx % 2 == 1 ? { backgroundColor: 'beige' } : { backgroundColor: 'white' }}>

                                    <LeaderBoardSegment message={(idx + 1).toString()} />
                                    <LeaderBoardSegment message={leaderBoardEntry.id} />
                                    <LeaderBoardSegment message={`r/${leaderBoardEntry.subReddit}`} />
                                    <LeaderBoardSegment message={leaderBoardEntry.totalCost.toString()} />


                                    <Paper style={{ padding: 10, flex: 6 }}>
                                        <Link href={leaderBoardEntry.permalink} rel="noopener" target="_blank">
                                            {leaderBoardEntry.id.length === 7 ? "view comment" : "view post"}
                                        </Link>
                                    </Paper>

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