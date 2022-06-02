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

//pass media and use like this??
// const mediaId = await client.v1.uploadMedia("./image.png");

//await auth01Client.v2.tweetThread([
//   "Hello, lets talk about Twitter!",
//   {
//     text: "Twitter is a fantastic social network. Look at this:",
//     media: { media_ids: [mediaId] },
//   },
//   "This thread is automatically made with twitter-api-v2 :D",
// ]);

//this is adding media from your drive not embedding
// const mediaThreadReply = async (ary, id, mediaAry) => {
//   try {
//     let tweetId = id;
//     for (let i = 0; i < ary.length; i++) {
//       const mediaId = await auth01Client.v1.uploadMedia(mediaAry[i]);
//       //okay easiest thing in the world
//       const tweet = await auth01Client.v2.reply("ary[i]", tweetId, {
//         // text: ary[i],
//         media: { media_ids: [mediaId] },
//       });
//       tweetId = tweet.data.id; //set next id to this tweet id - so a thread of replies
//     }
//   } catch (e) {
//     console.error("mediaThreadReply ", e);
//   }
// };

const threadReply = async (ary, id) => {
  try {
    let tweetId = id;
    for (let i = 0; i < ary.length; i++) {
      //okay easiest thing in the world
      //should call tweetReply
      const tweet = await auth01Client.v2.reply(ary[i], tweetId);
      tweetId = tweet.data.id; //set next id to this tweet id - so a thread of replies
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
