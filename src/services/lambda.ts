import { RestoreOutlined } from '@material-ui/icons';
import axios from 'axios';
import { Coin, CoinData } from '../types';

const redditAwardCountLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount';
const createAwardItLeaderBoardEntryLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/createRedditLeaderboardEntry';
const getAwardItLeaderBoardEntriesLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/getRedditLeaderboardEntries';

export const createAwardItLeaderBoardEntry = (id: string, awards: Coin[], totalCost: number, permalink: string) => {

    const body = { id, awards, totalCost, permalink }
    return axios.post(`${createAwardItLeaderBoardEntryLambdaUrl}`, body);
}

const sortCoinsByDescendingPrice = (coinA: Coin, coinB: Coin) => {
    const priceA = coinA.coin_price;
    const priceB = coinB.coin_price;

    return priceB - priceA;
}

export const getAwardCountForId = async (req: string, postOrComment: string): Promise<CoinData> => {

    return await axios.get(`${redditAwardCountLambdaUrl}?url=${req}&post-or-comment=${postOrComment}`)
        .then(result => {

            if (Object.keys(result.data.coins).length === 0) {
                let newCoinData: CoinData = {
                    coins: [],
                    totalCost: 0,
                    permalink: '',
                    id: ''
                }
                return newCoinData;
            }
            else {
                let unSortedCoins: Coin[] = Object.values(result.data.coins);
                let sortedCoins = unSortedCoins.sort(sortCoinsByDescendingPrice);

                let newCoinData: CoinData = {
                    totalCost: result.data.total_cost,
                    coins: sortedCoins,
                    permalink: result.data.permalink,
                    id: result.data.id
                }
                return newCoinData
            }

        })
        .catch(err => err)
}