import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Grid, Switch, Theme } from '@material-ui/core';
import { CoinData } from '../types';

type DisplaySwitchesPropTypes = {
    toggleChecked: () => void,
    displayingCoins: boolean,
    setDisplayingCoins: React.Dispatch<React.SetStateAction<boolean>>,
    displayingLeaderBoard: boolean,
    setDisplayingLeaderBoard: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function DisplaySwitches({ toggleChecked, displayingCoins, 
        setDisplayingCoins, setDisplayingLeaderBoard, displayingLeaderBoard }: DisplaySwitchesPropTypes) {

    return (
        <>
            <Grid item sm={4} xs={6}>
                <div style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <p>post</p>
                    <Switch onChange={toggleChecked} />
                    <p>comment</p>
                </div>
            </Grid>
            <Grid item sm={4} xs={6}>
                <div style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <p>show coins</p>
                    <Switch
                        checked={displayingCoins}
                        onChange={() => {
                            setDisplayingCoins(!displayingCoins);
                        }} />
                </div>
            </Grid>
            <Grid item sm={4} xs={6}>
                <div style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <p>show leader board</p>
                    <Switch
                        checked={displayingLeaderBoard}
                        onChange={() => {
                            setDisplayingLeaderBoard(!displayingLeaderBoard);
                        }} />
                </div>
            </Grid>
        </>
    );
}