import requests
import pydash as _

def get_unique_ids():
    feeds = []
    feedIds = [];
    for i in range(1,3):
        resp = requests.get('http://localhost:3000/masto/page/{}'.format(i))
        responseDict = resp.json()
        for eachFeed in responseDict['feeds']:
            feeds.append(eachFeed)
            feedIds.append(eachFeed['id'])

    print(len(_.uniq(feedIds)))
    # print(responseDict)
    # for eachFeed in responseDict['feeds']:
        # ids.append(eachFeed['id'])
    # print(len(_.uniq(ids)))

get_unique_ids()
