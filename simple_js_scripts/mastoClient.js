//const masto = require("masto");
//const dotenv = require("dotenv");
//dotenv.config();
//const mastoClient = masto.createRestAPIClient({
  //url: "https://mastodon.social",
  //access: process.env.MASTODON_ACCESS_TOKEN
//});

//const tagsResponse = mastoClient.v1.timelines.tag("linux");
//console.log(tagsResponse);
//

import { config } from 'dotenv';
import { createRestAPIClient } from 'masto';
config();
const mastoClient = createRestAPIClient({
  url: 'https://mastodon.social',
  accessToken: process.env.MASTODON_ACCESS_TOKEN,
  fetch: globalThis.fetch,
});

//const tagResponse = mastoClient.v1.timelines.tag('linux');
//try {
  //const feeds = await mastoClient.v1.timelines.tag.list("linux", {
    //limit: 20
  //});
//} catch(err) {
  //console.error(err);
//}

async function createStatus(content) {
  console.log(`trying to create status with content ${content}`);
  try {
    const feeds = await mastoClient.v1.statuses.create({
      status: "test status",
    });
  } catch(error) {
    console.error(error);
  }
}

async function getFeedsAgainstTag(tag) {
  const feeds = await mastoClient.v1.timelines.home.list({
    limit: 30,
  });
  for (const eachFeed of feeds) {
    Object.keys(eachFeed).forEach((eachKey) => {
      console.log('key is ', eachKey);
      console.log('value is ', eachFeed[eachKey]);
    });
  }
}

async function getFeedsFromIds(id) {
  const feeds = await mastoClient.v1.timelines.home.list({
    limit:30,
    sinceId: id,
  });
  console.log("feeds found", feeds);
}

getFeedsAgainstTag("linux");
