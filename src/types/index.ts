export class CoinData {
    totalCost: number;
    coins: Array<any>;
    id: string;
    permalink: string;
    subReddit: string;
    title: string;

    constructor(results: any) {
        this.coins = results.data.coins;
        this.totalCost = results.data.total_cost;
        this.permalink = results.data.permalink;
        this.id = results.data.id;
        this.subReddit = results.data.subReddit;
        this.title = results.data.title;
    }
}

export class LeaderBoardData extends CoinData {
    position: number;
    highlighted: boolean;

    constructor(results: any) {
        super(results);
        this.position = results.data.position;
        this.highlighted = results.data.highlighted;
    }
}

export class Coin {
    coin_price: number;
    count: number;
    icon: string;
    name: string;

    constructor(coin_price: number, count: number, icon: string, name: string) {
        this.coin_price = coin_price;
        this.count = count;
        this.icon = icon;
        this.name = name;
    }
}
