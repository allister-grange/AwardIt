import axios from 'axios';
import { Coin } from '../types';

const redditAwardCountLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/RedditAwardCount';
const createAwardItLeaderBoardEntryLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/createRedditLeaderboardEntry';
const getAwardItLeaderBoardEntriesLambdaUrl = 'https://q8sjefj7s6.execute-api.ap-southeast-2.amazonaws.com/default/getRedditLeaderboardEntries';

export const createAwardItLeaderBoardEntry = (id: string, awards: Coin[], total_cost: number, permalink: string) => {

    const body = { id, awards, total_cost, permalink }

    return axios.post(`${createAwardItLeaderBoardEntryLambdaUrl}`, body);
}

export const getAwardCountForId = async(req: string, postOrComment: string): Promise<any> => {

    return await axios.get(`${redditAwardCountLambdaUrl}?url=${req}&post-or-comment=${postOrComment}`)
    .then(res => res)
    .catch(err => err)
}