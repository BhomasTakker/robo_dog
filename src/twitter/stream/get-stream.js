const { ETwitterStreamEvent } = require("twitter-api-v2");
const { auth02Client } = require("../clients");

const { searchStream } = require("./search-stream");

const { createStreamRules, updateStreamRules } = require("./stream-rules");

const { sendTweet, tweetReply } = require("../tweet/send-tweet");

const { evaluateTweet } = require("../rules/reply-rules");

const { executeFetch } = require("../fetch/fetch");

const USERNAME = process.env.TWITTER_USERNAME;

//helpers or something
//modify for multiple commands
const getCommand = (text) => {
  //just a list of fetch, fetch:all, fetch:video, commence, etc, and loop looking
  const command = "fetch";

  //use switch case

  if (text.toLowerCase().includes(command)) {
    const index = text.toLowerCase().indexOf(command) + command.length;
    if (index === -1) {
      return {
        command: null,
        index,
        str: text,
      };
    }
    return {
      command,
      index,
      str: text.slice(index),
    };
  }
};

const getStream = async () => {
  try {
    createStreamRules();
    updateStreamRules();

    const stream = await searchStream();

    stream.autoReconnect = true;

    stream.on(ETwitterStreamEvent.Data, async (tweet) => {
      const { author_id, id, text } = tweet.data;

      if (!evaluateTweet(tweet)) {
        console.log("Duck out no reply");
        return;
      }

      console.log("request ", text);

      //If next word is a command (should allow please!)
      //Do something and duck out
      //Or duck out
      const { str, index, command } = getCommand(text);
      if (!command) {
        console.log("no given command");
        return;
      }
      //executeCommand == fetch
      //executeCommand('fetch')
      const response = await executeFetch(str);
      const result = await response.json();

      //get Fetch command === news
      //fetch, fetch:news, fetch:videos, fetch:etc

      //

      console.log("TEXT ", text);
      console.log("str ", str);
      console.log("index ", index);
      console.log("command ", command);

      console.log("RESULT ", result);
      const { status, totalResults, articles } = result;

      if (status !== "ok") {
        return;
      }
      //   console.log("HERE 7 ", tweet.data);
      //   await rwClient.v2.tweet("Wub Wub");

      //boris johnson && party
      const reply = `Fetched result 1
      of ${totalResults} results
      ${articles[0].title}
      ${articles[0].url}`;

      tweetReply(`${reply}`, id);
    });
  } catch (e) {
    console.log("HERE:ERROR");
    console.error(e);
  }
};

module.exports = {
  getStream,
};
