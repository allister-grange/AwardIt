import axios from "axios";
import { Coin, RedditPost, LeaderBoardData } from "../types";

const redditAwardCountLambdaUrl =
  "https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount";
const createAwardItLeaderBoardEntryLambdaUrl =
  "https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/createRedditLeaderboardEntry";
const getAwardItLeaderBoardEntriesLambdaUrl = "http://localhost:3001/awards";

export const createAwardItLeaderBoardEntry = async (
  id: string,
  coins: Coin[],
  totalCost: number,
  permalink: string,
  subReddit: string,
  title: string
): Promise<RedditPost> => {
  const body = { id, coins, totalCost, permalink, subReddit, title };
  return await axios
    .post(`${createAwardItLeaderBoardEntryLambdaUrl}`, body)
    .then((res) => res)
    .catch((err) => err);
};

export const getAwardItLeaderBoardEntries = async (): Promise<
  LeaderBoardData[]
> => {
  return await axios
    .get(getAwardItLeaderBoardEntriesLambdaUrl)
    .then(async (res) => {
      const data = await res.data;
      return data.items;
    })
    .catch((err) => err);
};

const sortCoinsByDescendingPrice = (coinA: Coin, coinB: Coin) => {
  const priceA = coinA.coin_price;
  const priceB = coinB.coin_price;

  return priceB - priceA;
};

export const getAwardCountForId = async (
  req: string,
  postOrComment: string
): Promise<RedditPost> => {
  return await axios
    .get(
      `${redditAwardCountLambdaUrl}?url=${req}&post-or-comment=${postOrComment}`
    )
    .then((result) => {
      if (Object.keys(result.data.coins).length === 0) {
        let newRedditPost: RedditPost = {
          coins: [],
          totalCost: 0,
          permalink: "",
          id: "",
          subReddit: "",
          title: "",
        };
        return newRedditPost;
      } else {
        let unSortedCoins: Coin[] = Object.values(result.data.coins);
        let sortedCoins = unSortedCoins.sort(sortCoinsByDescendingPrice);

        let newRedditPost: RedditPost = {
          totalCost: result.data.total_cost,
          coins: sortedCoins,
          permalink: result.data.permalink,
          id: result.data.id,
          subReddit: result.data.subReddit,
          title: result.data.title,
        };
        return newRedditPost;
      }
    })
    .catch((err) => err);
};
