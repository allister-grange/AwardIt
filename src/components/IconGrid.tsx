import { Avatar, Button, Fade, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { LeaderBoardData } from '../types';

type DisplaySwitchesPropTypes = {
  leaderBoardEntry: LeaderBoardData
}

export default function IconGrid({ leaderBoardEntry }: DisplaySwitchesPropTypes) {

  const [showingAllCoins, setShowingAllCoins] = useState(false);

  return (
    <>
      {
        leaderBoardEntry.coins?.map((coin, idx) => {

          if (idx < 40 || showingAllCoins) {
            return (
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
            )
          }
          else if (idx === 40 && !showingAllCoins) {
            return (
              <div onClick={() => setShowingAllCoins(true)} 
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', cursor: 'pointer' }}>
                  <Typography variant="body1" gutterBottom>
                    {"... show all awards"}
                  </Typography>
              </div>
            );
          }
        })
      }
    </>
  );
}