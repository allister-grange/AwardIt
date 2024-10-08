import React, { useState } from "react";
import { RedditPost } from "../types";
import Pagination from "@material-ui/lab/Pagination";
import { IconGrid } from "./IconGrid";

interface LeaderBoardProps {
  posts: RedditPost[];
  currentPage?: number;
  pageCount?: number;
  handlePageChange: any;
}

function getBackgroundColor(position: number) {
  if (position == 1) {
    return "bg-yellow-400";
  } else if (position == 2) {
    return "bg-gray-400";
  } else if (position == 3) {
    return "bg-yellow-800";
  }
  return "";
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({
  posts,
  currentPage,
  pageCount,
  handlePageChange,
}) => {
  const [leaderBoardPosShowingAllAwards, setLeaderBoardPosShowingAllAwards] =
    useState(-1);

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16 text-center sm:max-w-[90%]">
      {posts.map((post) => {
        const isTop3 =
          post.leaderBoardPosition && post.leaderBoardPosition <= 3;
        const bgColor = getBackgroundColor(post.leaderBoardPosition);

        return (
          <div
            className="flex items-center mt-8 relative justify-center"
            key={post.id}
          >
            <div
              className="absolute top-2 left-5 sm:static sm:flex 
              sm:bg-black font-bold sm:bg-opacity-5 rounded-xl mr-4 
              justify-center items-center text-lg md:text-3xl sm:w-24 sm:h-24"
            >
              {isTop3 ? (
                <div
                  className={`rounded-full ${bgColor} h-5 w-5 sm:h-12 sm:w-12 text-primary-bg flex justify-center items-center`}
                >
                  {post.leaderBoardPosition}
                </div>
              ) : (
                post.leaderBoardPosition
              )}
            </div>
            <div
              className={`flex flex-col text-center sm:flex-row max-w-xs sm:max-w-3xl
              ${
                post.isHighlighted ? "bg-blue-100" : "bg-primary-bg_secondary"
              } rounded-xl p-4 flex grow ${
                post.leaderBoardPosition! === leaderBoardPosShowingAllAwards
                  ? undefined
                  : "md:h-46"
              }`}
            >
              <div className="bg-transparent min-w-max sm:mr-12 sm:max-h-32 flex flex-col justify-between p-2">
                <div>
                  <span className="text-gray-500 bold font-bold">TITLE: </span>
                  <a href={post.permalink} className="underline">
                    {post.title.length > 30
                      ? post.title.slice(0, 30) + "..."
                      : post.title}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 bold font-bold">POINTS: </span>
                  {post.totalCost}
                </div>
                <div>
                  <span className="text-gray-500 bold font-bold">
                    SUBREDDIT:{" "}
                  </span>
                  r/{post.subReddit}
                </div>
                <div>
                  <span className="text-gray-500 bold font-bold">COST: </span>
                  <span className="font-bold">
                    {`${lowestPossiblePrice(
                      post.totalCost
                    )} to ${highestPossiblePrice(post.totalCost)}`}
                  </span>
                </div>
              </div>
              <IconGrid
                coins={post.coins}
                setLeaderBoardPosShowingAllAwards={
                  setLeaderBoardPosShowingAllAwards
                }
                showingAllAwards={
                  post.leaderBoardPosition! === leaderBoardPosShowingAllAwards
                }
                position={post.leaderBoardPosition!}
              />
            </div>
          </div>
        );
      })}
      <div className="flex justify-center mt-8">
        <Pagination
          page={currentPage}
          count={pageCount}
          defaultPage={1}
          onChange={handlePageChange}
          variant="outlined"
        />
      </div>
    </div>
  );
};

const highestPossiblePrice = (apiPrice: any) => {
  const lowestCoinRatio: number = 1.99 / 500;
  let highestCostPrice = lowestCoinRatio * apiPrice;
  return formatPrice(highestCostPrice);
};

const lowestPossiblePrice = (apiPrice: any) => {
  const highestCoinRatio: number = 99.99 / 40000;
  let lowestCostPrice = highestCoinRatio * apiPrice;
  return formatPrice(lowestCostPrice);
};

const formatPrice = (dollarAmount: number) => {
  let formattedAmount = dollarAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (dollarAmount >= 100) {
    formattedAmount = formattedAmount.replace(/\.\d\d$/, ""); // Remove decimal and two digits after it
  }

  return formattedAmount;
};
