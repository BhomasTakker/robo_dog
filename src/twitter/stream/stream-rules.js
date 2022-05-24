const { auth02Client } = require("../clients");

//probably not here
const USERNAME = process.env.TWITTER_USERNAME;

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

//pass rules in
const updateStreamRules = async () => {
  try {
    await auth02Client.v2.updateStreamRules({
      add: [{ value: USERNAME }],
    });
  } catch (error) {
    console.error("updateStreamRules Error:- ", error);
  }
};

module.exports = {
  createStreamRules,
  updateStreamRules,
};
