//Need to be taken from somewhere proper
const USERNAME = process.env.TWITTER_USERNAME;
const AUTHOR_ID = process.env.TWITTER_AUTHOR_ID;
//This is unrequired and did not work as intended
const tweetContainsUsername = (tweet) => {
  const { text } = tweet.data;
  if (text.substring(USERNAME)) {
    return true;
  }
  return false;
};

const isARetweet = (tweet) => {
  const isARetweet =
    tweet.data.referenced_tweets?.some((tweet) => tweet.type === "retweeted") ??
    false;

  if (isARetweet || tweet.data.author_id === AUTHOR_ID) {
    return true;
  }

  return false;
};

const evaluateTweet = (tweet) => {
  if (isARetweet(tweet)) {
    return false;
  }

  return true;
};

module.exports = {
  isARetweet,
  tweetContainsUsername,
  evaluateTweet,
};
