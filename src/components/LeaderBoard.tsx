import React from 'react';
import { createStyles, Grid, Link, makeStyles, Paper, Slide, Theme, Tooltip, Typography } from '@material-ui/core';
import { CoinData } from '../types';

type LeaderBoardProps = {
    posts: CoinData[],
    showingLeaderBoard: boolean
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
        },    
    })
);

export default function LeaderBoard({ posts, showingLeaderBoard }: LeaderBoardProps) {

    const classes = useStyles();

    return (
        <Slide direction="up" in={showingLeaderBoard} timeout={1000} mountOnEnter unmountOnExit>
            <Grid
                container spacing={1}
            >
                {
                    posts.map((coin, idx) => {
                        return (
                            <Grid
                                key={idx} item xl={12} xs={12} >
                                    
                                    <Paper className={classes.paper}>
                                        {`${coin.id} | ${coin.totalCost} | ${coin.coins} | `}
                                        <Link href={coin.permalink} rel="noopener" target="_blank">
                                            {coin.id.length === 7 ? "view comment" : "view post"}
                                        </Link>
                                    </Paper>

                                {/* <div style={{flexDirection: 'row', alignItems: 'self'}}>
                                    <Typography>
                                        {coin.id}
                                    </Typography>
                                    <Typography>
                                        {coin.totalCost}
                                    </Typography>
                                    <Typography>
                                        {coin.id}
                                    </Typography>
                                    <Typography>
                                        <Link href={coin.permalink} rel="noopener" target="_blank">
                                            {coin.id.length === 7 ? "view comment" : "view post"}
                                        </Link>
                                    </Typography>

                                </div> */}
                                {/* <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={(coin * coin.count) + " coins"}
                                    placement="top"
                                    aria-label="coin price"
                                    arrow >
                                    <Paper className={classes.paper}>
                                        <Avatar alt={coin.name + ' icon'} src={coin.icon} />
                                        <Typography className={classes.awardCardText} variant="body1" gutterBottom>
                                            {coin.count + 'x ' + coin.name}
                                        </Typography>
                                    </Paper>
                                </Tooltip> */}
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Slide>
    );
}