export class LeaderBoardData {
  position: number;
  highlighted: boolean;

  constructor(results: any) {
    this.position = results.data.position;
    this.highlighted = results.data.highlighted;
  }
}

export type Coin = {
  coin_price: number;
  count: number;
  icon: string;
  name: string;
};

export type RedditPost = {
  totalCost: number;
  coins: Array<Coin>;
  id: string;
  permalink: string;
  subReddit: string;
  title: string;
  isHighlighted?: boolean;
  leaderBoardPosition?: number;
};

export type GetPostsApiResponse = {
  posts: RedditPost[];
  totalPages: number;
  page: number;
  isHighlighted: boolean;
};
