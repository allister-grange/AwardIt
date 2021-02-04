import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

type SearchResponsesProps = {
    errorOnSearch: boolean,
    noAwardsForPost: boolean,
    displayingCoins: boolean,
    postOrComment: string,
    data: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textPadding: {
            paddingTop: '25px'
        },
        errorText: {
            paddingTop: '25px',
            color: 'red'
        },
    })
);

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

export default function SearchResponses({ errorOnSearch, noAwardsForPost, displayingCoins,
    postOrComment, data }: SearchResponsesProps) {

    const classes = useStyles();

    return (
        <>
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
        </>
    );
}