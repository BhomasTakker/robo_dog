const { threadReply } = require("../tweet/send-tweet");

//display articles?
//fetched input/default or returned if < 10
const createPrefaceTweet = (totalResults) => {
  return `Fetched top 10
      of ${totalResults} results`;
};

//magic number - get from input or defaults
const createListItems = (results) => {
  return results.slice(0, 10).map((res) => {
    const { url, length, title } = res;
    return `
        ${title}
        ${url}`;
  });
};

//Article list
const displayAudioList = (result, originTweet) => {
  const { totalResults, results } = result;
  const { author_id, id, text } = originTweet.data;

  if (results.length <= 0) {
    return;
  }

  const reply = createPrefaceTweet(totalResults);
  const listItems = createListItems(results);

  listItems.unshift(reply);
  threadReply(listItems, id);
};

module.exports = {
  displayAudioList,
};
