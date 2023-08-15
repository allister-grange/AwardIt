import React from "react";
import { RedditPost } from "../types";
import { IconGridTailwind } from "./IconGridTailwind";

interface LeaderBoardTailwindProps {
  posts: RedditPost[];
  currentPage: number;
  pageCount: number;
  handlePageChange: any;
  displayingLeaderBoard: boolean;
}

export const LeaderBoardTailwind: React.FC<LeaderBoardTailwindProps> = ({
  posts,
  currentPage,
  pageCount,
  handlePageChange,
  displayingLeaderBoard,
}) => {
  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16">
      {posts.map((post) => {
        const isTop3 =
          post.leaderBoardPosition == 1 ||
          post.leaderBoardPosition == 2 ||
          post.leaderBoardPosition == 3;

        let bgColor = "";
        if (post.leaderBoardPosition == 1) {
          bgColor = "bg-yellow-400";
        } else if (post.leaderBoardPosition == 2) {
          bgColor = "bg-gray-400";
        } else if (post.leaderBoardPosition == 3) {
          bgColor = "bg-yellow-800";
        }

        return (
          <div className="flex items-center mt-8 ">
            <div className="bg-black font-bold bg-opacity-5 rounded-xl mr-4 flex justify-center items-center text-3xl w-24 h-24">
              {isTop3 ? (
                <div
                  className={`rounded-full ${bgColor} h-12 w-12 text-primary-bg flex justify-center items-center`}
                >
                  {post.leaderBoardPosition}
                </div>
              ) : (
                post.leaderBoardPosition
              )}
            </div>
            <div className="bg-primary-bg_secondary rounded-xl p-4 flex grow h-40">
              <div className="bg-transparent min-w-max mr-12 flex flex-col justify-between p-2">
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
              <IconGridTailwind coins={post.coins} />
            </div>
          </div>
        );
      })}
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
