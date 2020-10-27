import json
from botocore.vendored import requests

# TODO some regex check
def validate_url(url):
    if(len(url)!=6):
        return False
    return True

# if the url is ill formatted just find the 6 character string and return in
def find_id(url):

    splitUrl = url.split('/')
    
    for sequence in splitUrl: 
        if(len(sequence) == 6 and sequence != 'https:'):
            return sequence

    # throw an error here
    return 'ERROR NO ID'

def format_awards_response(awards):

    res = {}
    res['coins'] = {}
    totalCost = 0

    for award in awards:
        name = award['name']
        formatted_award = {}
        formatted_award['name'] = name
        formatted_award['coin_price'] = award['coin_price']
        formatted_award['count'] = award['count']
        formatted_award['icon'] = award['icon_url']
        totalCost += int(award['coin_price']) * int(award['count'])
        
        res['coins'][name] = formatted_award
        
    res['total_cost'] = totalCost
    return res

def lambda_handler(event, context):
    user_agent = 'AwardsEstimator by allig256'
    url = event['queryStringParameters']['url']
    reddit_base_url = 'https://www.reddit.com/api/info.json?id=t3_'
    headers = {'User-Agent': user_agent}

    # using split strings 
    try:
        id = url.split('/')[4]
        
    except IndexError: 
        id = find_id(url)

    if(validate_url(id) == False):
        print("That's a wrong formatted id, trying to just find the id")
        id = find_id(url)

    res = requests.get(reddit_base_url + id, headers=headers)

    data = json.loads(res.text)

    awards = data['data']['children'][0]['data']['all_awardings']

    awards_res = format_awards_response(awards)

    print(awards_res)

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps(awards_res)
    }
