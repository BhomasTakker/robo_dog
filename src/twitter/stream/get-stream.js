const { searchStream } = require("./search-stream");

const { createStreamRules, updateStreamRules } = require("./stream-rules");

const { evaluateTweet } = require("../rules/reply-rules");

//These two called from a news fetch command file
const { executeFetch } = require("../fetch/fetch");
const { displayList } = require("../display/display-list");
const { getCommand } = require("../../commands/get-command");

const USERNAME = process.env.TWITTER_USERNAME;

const getStream = async () => {
  createStreamRules();
  updateStreamRules();

  return (stream = await searchStream());
};

module.exports = {
  getStream,
};
