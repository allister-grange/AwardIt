# [AwardIt](https://awardit.info)

https://github.com/allister-grange/AwardIt/assets/18430086/62efe670-e37e-47fc-b543-723c42e191b7

## Tech

The site is built using React with Typescript. This front end is hosted on an AWS S3 bucket, behind a CloudFront distribution.

The backend is a Python Lambda function in AWS that queries [Reddit's API](https://www.reddit.com/dev/api/), behind an API Gateway instance

## Motivation

This application was built due to numerous requests of users on the r/theydidthemath subreddit wanting to see how much the awards on various posts cost.

Instead of building a boring calculator, I wanted to build something aesthetic that provided a visual answer. 

So, here is AwardIt!

## Hosting locally 

You will need to update the hook in `useRedditPostData.tsx` to use the local by switching the BACKEND_URL variable to `http://localhost:3001`. Yes, this is janky, but it's a quick job! 

```
# frontend
git clone https://github.com/allister-grange/AwardIt && cd ./awardit
npm i && npm start

# backend
cd ./api
npm i && npm run dev
```
