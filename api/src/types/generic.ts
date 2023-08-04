export interface Coin {
  M: M;
}

export interface M {
  icon: Icon;
  name: Name;
  count: Count;
  coin_price: CoinPrice;
}

export interface Icon {
  S: string;
}

export interface Name {
  S: string;
}

export interface Count {
  N: string;
}

export interface CoinPrice {
  N: string;
}

export interface RedditPost {
  totalCost: number;
  coins: Array<Coin>;
  id: string;
  permalink: string;
  subReddit: string;
  title: string;
}
