//the bot effectively
const { ETwitterStreamEvent } = require("twitter-api-v2");
const { auth02Client } = require("./twitter/clients");

const { evaluateTweet } = require("./twitter/rules/reply-rules");

const { getCommand } = require("./commands/get-command");

const { getStream } = require("./twitter/stream/get-stream");
const { executeCommand } = require("./commands/execute-command");

const USERNAME = process.env.TWITTER_USERNAME;

const bot = async () => {
  const stream = await getStream();
  stream.autoReconnect = true;

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    const { author_id, id, text } = tweet.data;

    //check tweet validity
    if (!evaluateTweet(tweet)) {
      //validateIncomingTweet At me
      console.log("Duck out no reply");
      return;
    }

    //this could be joined with call command // should
    const { str, index, command } = getCommand(text);
    if (!command) {
      //not a legal command
      console.log("no given command");
      return;
    }

    executeCommand(command, str, tweet); //pass tweet or sub that
  });
};

module.exports = { bot };
