const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

// const streamClient = client.readWrite
const auth01Client = client.readWrite;
const auth02Client = twitterClient.readWrite;
// module.exports = rwClient;
//module.exports = stream;
module.exports = {
  auth01Client,
  auth02Client,
};
