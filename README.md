# [AwardIt](https://awardit.info)

https://github.com/allister-grange/AwardIt/assets/18430086/cac11787-538a-4063-bcf2-1dbe5e1bc1de

## Tech

The site is built using React with Typescript. This front end is hosted on an AWS S3 bucket, behind a CloudFront distribution.

The backend is a Python Lambda function in AWS that queries [Reddit's API](https://www.reddit.com/dev/api/), behind an API Gateway instance

## Motivation

This application was built due to numerous requests of users on the r/theydidthemath subreddit wanting to see how much the awards on various posts cost.

Instead of building a boring calculator, I wanted to build something aesthetic that provided a visual answer. 

So, here is AwardIt!

## Hosting locally 

```
git clone https://github.com/allister-grange/AwardIt && cd ./awardit
npm i && npm start
```

The backend is served from a lambda function in AWS, I would recommend changing the lambdaEndPoint variable in the HomePage to a mock response from the API in a JSON file. Such as:

``` JSON
{
    coins: {
        Timeless Beauty: {
        name: "Timeless Beauty",
        coin_price: 250,
        count: 2,
        icon: "https://i.redd.it/award_images/t5_22cerq/crhlsu5wzlc41_TimelessBeauty.png"
        },
        Uplifting Pride Post: {
        name: "Uplifting Pride Post",
        coin_price: 500,
        count: 2,
        icon: "https://i.redd.it/award_images/t5_2qhh7/2ts7zttmr8k31_UpliftingPridePost.png"
        },
        Platinum: {
        name: "Platinum",
        coin_price: 1800,
        count: 2,
        icon: "https://www.redditstatic.com/gold/awards/icon/platinum_512.png"
        },
        Gold: {
        name: "Gold",
        coin_price: 500,
        count: 3,
        icon: "https://www.redditstatic.com/gold/awards/icon/gold_512.png"
        },
        2020 Vision: {
        name: "2020 Vision",
        coin_price: 300,
        count: 1,
        icon: "https://i.redd.it/award_images/t5_22cerq/48eychq6e9741_2020Vision.png"
        },
        Time for Love: {
        name: "Time for Love",
        coin_price: 250,
        count: 1,
        icon: "https://i.redd.it/award_images/t5_22cerq/1yaj0vwi47g41_TimeforLove.png"
        },
        San Francisco: {
        name: "San Francisco",
        coin_price: 250,
        count: 1,
        icon: "https://i.redd.it/award_images/t5_22cerq/tge1y875e7e41_SanFrancisco-1.png"
        },
        Bless Up: {
        name: "Bless Up",
        coin_price: 150,
        count: 4,
        icon: "https://i.redd.it/award_images/t5_22cerq/trfv6ems1md41_BlessUp.png"
        },
        Wholesome: {
        name: "Wholesome",
        coin_price: 125,
        count: 17,
        icon: "https://i.redd.it/award_images/t5_22cerq/5izbv4fn0md41_Wholesome.png"
        },
        Silver: {
        name: "Silver",
        coin_price: 100,
        count: 26,
        icon: "https://www.redditstatic.com/gold/awards/icon/silver_512.png"
        }
    },
    total_cost: 12725
}
```
