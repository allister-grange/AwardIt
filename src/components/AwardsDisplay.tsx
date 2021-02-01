import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Box from '@material-ui/core/Box';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Search from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';
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
    }));

export default function AwardsDisplay({ hasSearched, setDisplayingCoins, data }: AwardsDisplayPropTypes) {
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();

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