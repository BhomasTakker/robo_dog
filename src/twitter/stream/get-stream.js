const { ETwitterStreamEvent } = require("twitter-api-v2");
const { auth02Client } = require("../clients");

const { searchStream } = require("./search-stream");

const { createStreamRules, updateStreamRules } = require("./stream-rules");

const { evaluateTweet } = require("../rules/reply-rules");

//These two called from a news fetch command file
const { executeFetch } = require("../fetch/fetch");
const { displayList } = require("../display/display-list");

const USERNAME = process.env.TWITTER_USERNAME;

//seperate and simplify
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

    //triggered on rules hit / should have a good way of setting
    //create an actual callback function
    stream.on(ETwitterStreamEvent.Data, async (tweet) => {
      const { author_id, id, text } = tweet.data;

      //check tweet validity
      if (!evaluateTweet(tweet)) {
        //validateIncomingTweet At me
        console.log("Duck out no reply");
        return;
      }

      console.log("request ", text);

      //If next word is a command (should allow please!)
      //Do something and duck out
      //Or duck out
      //more then get command
      const { str, index, command } = getCommand(text);
      if (!command) {
        //not a legal command
        console.log("no given command");
        return;
      }

      //This all needs factorying away from here
      //Get command go a route pass the data / simple
      //just blam an error or error return on incorrect
      //executeCommand == fetch
      //executeCommand('fetch')
      const response = await executeFetch(str);
      const result = await response.json();
      //Modify return

      //get Fetch command === news
      //fetch, fetch:news, fetch:videos, fetch:etc

      //

      console.log("TEXT ", text);
      console.log("str ", str);
      console.log("index ", index);
      console.log("command ", command);

      console.log("RESULT ", result);
      displayList(result, tweet);
      // const { status, totalResults, articles } = result;

      // if (status !== "ok") {
      //   return;
      // }
      // //   console.log("HERE 7 ", tweet.data);
      // //   await rwClient.v2.tweet("Wub Wub");

      // //DISPLAY
      // //boris johnson && party
      // const reply = `Fetched top 10
      // of ${totalResults} results`;

      // //use default or given limit
      // const returnArticles = articles.slice(0, 10).map((art) => {
      //   return `
      //   ${art.title}
      //   ${art.url}`;
      // });
      // returnArticles.unshift(reply);
      // threadReply(returnArticles, id);
    });
  } catch (e) {
    console.log("HERE:ERROR");
    console.error(e);
  }
};

module.exports = {
  getStream,
};
