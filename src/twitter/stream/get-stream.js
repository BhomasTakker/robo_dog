const { searchStream } = require("./search-stream");

const { createStreamRules, updateStreamRules } = require("./stream-rules");

const USERNAME = process.env.TWITTER_USERNAME;

const getStream = async () => {
  createStreamRules();
  updateStreamRules();

  return (stream = await searchStream());
};

module.exports = {
  getStream,
};
