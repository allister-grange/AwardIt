import { Avatar, Fade, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { RedditPost } from "../types";

type DisplaySwitchesPropTypes = {
  leaderBoardEntry?: RedditPost;
};

export default function IconGrid({
  leaderBoardEntry,
}: DisplaySwitchesPropTypes) {
  const [showingAllCoins, setShowingAllCoins] = useState(false);

  return (
    <>
      {leaderBoardEntry?.coins?.map((coin, idx) => {
        if (idx < 30 || showingAllCoins) {
          return (
            <Tooltip
              key={idx}
              style={{ cursor: "pointer" }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title={coin.coin_price * coin.count + " coins"}
              placement="top"
              aria-label="coin price"
              arrow
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingRight: "13px",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  {coin.count + "x "}
                </Typography>
                <Avatar
                  style={{ height: "20px", width: "20px" }}
                  sizes="sm"
                  alt={coin.name + " icon"}
                  src={decodeURI(coin.icon).replace("&amp;", "&")}
                />
              </div>
            </Tooltip>
          );
        } else if (idx === 30 && !showingAllCoins) {
          return (
            <div
              onClick={() => setShowingAllCoins(true)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="body1" gutterBottom>
                {"... show all awards"}
              </Typography>
            </div>
          );
        }
      })}
    </>
  );
}
