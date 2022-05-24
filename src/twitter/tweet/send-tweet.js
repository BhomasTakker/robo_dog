const { auth01Client } = require("../clients");

const sendTweet = async (txt) => {
  try {
    await auth01Client.v2.tweet(txt);
  } catch (e) {
    console.error(e);
  }
};

const tweetReply = async (txt, id) => {
  try {
    await auth01Client.v2.reply(txt, id);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  sendTweet,
  tweetReply,
};
