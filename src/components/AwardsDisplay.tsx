import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, createStyles, Fade, Grid, Paper, Slide, Theme, Tooltip, Typography } from '@material-ui/core';

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
        "& $notchedOutline": {
            borderColor: "grey"
        },
        "&:hover $notchedOutline": {
            borderColor: "coral",
        },
        "&$focused $notchedOutline": {
            borderColor: "coral"
        }
    },
    focused: {},
    notchedOutline: {}
}));

type CoinData = {
    totalCost?: number;
    coins?: Array<any>;
}

type AwardsDisplayPropTypes = {
    hasSearched: boolean,
    setDisplayingCoins: React.Dispatch<React.SetStateAction<boolean>>,
    data: CoinData
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        }
    })
);

export default function AwardsDisplay({ hasSearched, setDisplayingCoins, data }: AwardsDisplayPropTypes) {
    const classes = useStyles();

    return (
        <Slide direction="up" in={hasSearched} timeout={1000} onEntered={() => setDisplayingCoins(true)} onExiting={() => setDisplayingCoins(false)} mountOnEnter unmountOnExit>
            <Grid
                alignItems="center"
                justify="center"
                container spacing={3}
            >
                {
                    data.coins?.map((coin, idx) => {
                        return (
                            <Grid key={idx} item={true} lg={2} xl={2} xs={12} sm={6} md={3}>
                                <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={(coin.coin_price * coin.count) + " coins"}
                                    placement="top"
                                    aria-label="coin price"
                                    arrow >
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
    );
}