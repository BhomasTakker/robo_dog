const { auth01Client } = require("../clients");

const sendTweet = async (txt) => {
  try {
    await auth01Client.v2.tweet(txt);
  } catch (e) {
    console.error("SendTweetError ", e);
  }
};

const tweetReply = async (txt, id) => {
  try {
    await auth01Client.v2.reply(txt, id);
  } catch (e) {
    console.error("TweetReplyError ", e);
  }
};

const threadReply = async (ary, id) => {
  try {
    let tweetId = id;
    for (let i = 0; i < ary.length; i++) {
      //okay easiest thing in the world
      const tweet = await auth01Client.v2.reply(ary[i], tweetId);
      tweetId = tweet.data.id;
    }
  } catch (e) {
    console.error("ThreadReplyError ", e);
  }
};

//unused but interesting
//can we reply with a thread?
const tweetThread = async () => {
  try {
    await auth01Client.v2.tweetThread([txt]);
  } catch (e) {
    console.error("tweetThreadError ", e);
  }
};

module.exports = {
  sendTweet,
  tweetReply,
  tweetThread,
  threadReply,
};
