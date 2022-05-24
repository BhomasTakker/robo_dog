const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: "RFV5ydY3E19umEX4clQwAH0Vz",
  appSecret: "Q0ZBzpL1zffhli7c556eejSuSw4lSvkFsf5ZYNmBiYSNrR9is6",
  accessToken: "1375108086386544651-vWgOrYR3tgYxlL4gpbVPkeNpXBiPvj",
  accessSecret: "Hgif6DVyc7rxmOGzjEiUrdZv2nRfs5yxThol8PVqiFkgs",
});
const twitterClient = new TwitterApi(
  "AAAAAAAAAAAAAAAAAAAAAA90cwEAAAAAiXpIvUV3Lu2wJiyL%2BvWlfuitP%2Bk%3Dmk8Viq2c95awY5EgxcyYo7oAEsEnoOhjjnO0AwVb0A3HpkwUpN"
);

// const streamClient = client.readWrite
const auth01Client = client.readWrite;
const auth02Client = twitterClient.readWrite;
// module.exports = rwClient;
//module.exports = stream;
module.exports = {
  auth01Client,
  auth02Client,
};
