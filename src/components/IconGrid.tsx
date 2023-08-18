import React from "react";
import { Coin } from "../types";
import Tooltip from "@material-ui/core/Tooltip";

interface IconGridProps {
  coins: Coin[];
  setLeaderBoardPosShowingAllAwards: React.Dispatch<
    React.SetStateAction<number>
  >;
  showingAllAwards: boolean;
  position: number;
}

export const IconGrid: React.FC<IconGridProps> = ({
  coins,
  showingAllAwards,
  setLeaderBoardPosShowingAllAwards,
  position,
}) => {
  return (
    <div className="bg-transparent max-w-lg flex flex-row flex-wrap justify-center ml-auto p-2 borer-2xl items-center">
      {coins.map((coin, idx) => {
        if (idx < 30 || showingAllAwards) {
          return (
            <Tooltip
              key={coin.name}
              title={coin.coin_price * coin.count + " coins"}
              placement="top"
              aria-label="coin price"
              arrow
            >
              <div className="flex flex-row mr-3 py-1">
                <span className="text-gray-500">{coin.count}x</span>
                <img
                  className="w-5 h-5 rounded-full bg-transparent"
                  src={coin.icon}
                  alt="Reddit award icon"
                />
              </div>
            </Tooltip>
          );
        } else if (idx === 30 && !showingAllAwards) {
          return (
            <button onClick={() => setLeaderBoardPosShowingAllAwards(position)}>
              ...show all awards
            </button>
          );
        }
      })}
    </div>
  );
};
