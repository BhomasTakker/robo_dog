const { ETwitterStreamEvent } = require("twitter-api-v2");
const { auth02Client } = require("../clients");

const { sendTweet, tweetReply } = require("../tweet/send-tweet");

const AUTHOR_ID = "1375108086386544651";

//not get stream / this is set listener and respond
//Compartmentalise this
const createStreamRules = async () => {
  try {
    const streamRules = await auth02Client.v2.streamRules();

    if (streamRules.data?.length) {
      await auth02Client.v2.updateStreamRules({
        delete: { ids: streamRules.data.map((rule) => rule.id) },
      });
    }
  } catch (error) {
    console.error("createStreamRules Error:- ", error);
  }
};

const updateStreamRules = async () => {
  console.log("HERE3");
  await auth02Client.v2.updateStreamRules({
    //   add: [{ value: "JavaScript" }, { value: "NodeJS" }],
    add: [{ value: "@GoodBoyAtBadDog" }],
  });
};

const searchStream = async () => {
  const stream = await auth02Client.v2.searchStream({
    "tweet.fields": ["referenced_tweets", "author_id"],
    expansions: ["referenced_tweets.id"],
  });
  return stream;
};

const evaluateTweet = (tweet) => {
  //list of rules as functions
  const isARetweet =
    tweet.data.referenced_tweets?.some((tweet) => tweet.type === "retweeted") ??
    false;

  if (isARetweet || tweet.data.author_id === AUTHOR_ID) {
    console.log("RETURNED isARetweet", isARetweet);
    console.log(
      "RETURNED tweet.data.author_id === AUTHOR_ID",
      tweet.data.author_id === AUTHOR_ID
    );
    return false;
  }
  //list of rules
  if (!text.substring("@GoodBoyAtBadDog")) {
    console.log(
      "RETURNED message ! contain me - urgo a part of conversation",
      isARetweet
    );
    return false;
  }

  return true;
};

const getStream = async () => {
  try {
    createStreamRules();
    updateStreamRules();

    const stream = await searchStream();

    stream.autoReconnect = true;

    stream.on(ETwitterStreamEvent.Data, async (tweet) => {
      const { author_id, id, text } = tweet.data;

      const carryOn = evaluateTweet(tweet);

      if (!carryOn) {
        return;
      }
      //If next word is a command (should allow please!)
      //Do something and duck out
      //Or duck out

      console.log("TEXT ", text);
      //   console.log("HERE 7 ", tweet.data);
      //   await rwClient.v2.tweet("Wub Wub");
      tweetReply(`My reply to your tweet:- ${tweet.data.text}`, id);
    });
  } catch (e) {
    console.log("HERE:ERROR");
    console.error(e);
  }
};

module.exports = {
  getStream,
};
