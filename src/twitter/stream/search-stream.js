const { auth02Client } = require("../clients");

const searchStream = async () => {
  const stream = await auth02Client.v2.searchStream({
    "tweet.fields": ["referenced_tweets", "author_id"],
    expansions: ["referenced_tweets.id"],
  });
  return stream;
};

module.exports = {
  searchStream,
};
