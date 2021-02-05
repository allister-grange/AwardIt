export class CoinData {
    totalCost: number;
    coins: Array<any>;
    id: string;
    permalink: string;
    subReddit: string;

    constructor(results: any) {
        this.coins = results.data.coins;
        this.totalCost = results.data.total_cost;
        this.permalink = results.data.permalink;
        this.id = results.data.id;
        this.subReddit = results.data.subReddit;
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
