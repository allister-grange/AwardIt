import json
from botocore.vendored import requests
from urllib.parse import unquote

# if the url is ill formatted just find the 6 character string and return in


def find_id_from_url(url, post_or_comment):

    splitUrl = url.split('/')

    for sequence in reversed(splitUrl):
        if (len(sequence) == 6 and sequence != 'https:' and post_or_comment == 'post'):
            return sequence
        elif (len(sequence) == 7 and post_or_comment == 'comment'):
            return sequence

    # throw an error here
    raise ValueError('No ID was able to be parsed from the URL')


def format_awards_response(awards, permalink, id, sub_reddit, title):

    res = {}
    res['coins'] = {}
    totalCost = 0

    for award in awards:
        name = award['name']
        formatted_award = {}
        formatted_award['name'] = name
        formatted_award['coin_price'] = award['coin_price']
        formatted_award['count'] = award['count']
        formatted_award['icon'] = unquote(
            award['resized_icons'][2]['url']).replace('&amp;', '&')
        totalCost += int(award['coin_price']) * int(award['count'])

        res['coins'][name] = formatted_award

    res['permalink'] = permalink
    res['total_cost'] = totalCost
    res['subReddit'] = sub_reddit
    res['id'] = id
    res['title'] = title
    return res


# param is_post is 'true' if the api request is for a post, false for a comment
# this is because they have two different end points on the reddit api
def reddit_api_get_request(id, is_post):
    user_agent = 'AwardsEstimator by allig256'
    headers = {'User-Agent': user_agent}

    if (is_post):
        print("Getting a post's awards")
        reddit_base_url = 'https://www.reddit.com/api/info.json?id=t3_'
    else:
        print("Getting a comment's awards")
        reddit_base_url = 'https://www.reddit.com/api/info.json?id=t1_'

    res = requests.get(reddit_base_url + id, headers=headers)
    return res


# def lambda_handler(url, post_or_comment):

def lambda_handler(event, context):

    print(event['queryStringParameters'])

    url = event['queryStringParameters']['url']
    post_or_comment = event['queryStringParameters']['post-or-comment']

    print("post or comment = " + post_or_comment)

    # if the url is a nice copy/paste from the browser it should be easy to get the id

    id = find_id_from_url(url, post_or_comment)

    print("parsed id from url is " + id)

    if (id is None or (len(id) != 6 and len(id) != 7)):
        raise ValueError(
            'The parsed ID was not in the correct format. Id = ' + id)

    res = None

    if (len(id) == 6 and post_or_comment == "post"):
        # make a url request
        res = reddit_api_get_request(id, True)
    elif (len(id) == 7 and post_or_comment == "comment"):
        # make a comment reqest
        res = reddit_api_get_request(id, False)

    if res is None:
        raise ValueError('The API request did not return a result')

    data = json.loads(res.text)

    awards = data['data']['children'][0]['data']['all_awardings']
    sub_reddit = data['data']['children'][0]['data']['subreddit']
    permalink = 'https://www.reddit.com' + \
        data['data']['children'][0]['data']['permalink']
    if (post_or_comment == "post"):
        title = data['data']['children'][0]['data']['title']
    elif (post_or_comment == "comment"):
        title = data['data']['children'][0]['data']['body']

    awards_res = format_awards_response(
        awards, permalink, id, sub_reddit, title)

    print(awards_res)

    return {
        'statusCode': 200,
        'body': json.dumps(awards_res)
    }
