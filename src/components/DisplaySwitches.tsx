import React from 'react';
import { Grid, Switch } from '@material-ui/core';

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
            <Grid item sm={4} xs={8}>
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