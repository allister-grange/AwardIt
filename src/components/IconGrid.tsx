import React, { useState } from "react";
import { Coin } from "../types";

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
  // const [showingAllAwards, setShowingAllAwards] = useState(false);

  return (
    <div className="bg-transparent max-w-lg flex flex-row flex-wrap justify-center ml-auto p-2 borer-2xl items-center">
      {coins.map((coin, idx) => {
        if (idx < 30 || showingAllAwards) {
          return (
            <div className="flex flex-row mr-3 py-1">
              <span className="text-gray-500">{coin.count}x</span>
              <img
                className="w-5 h-5 rounded-full bg-transparent"
                src={coin.icon}
                alt="Reddit award icon"
              />
            </div>
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
