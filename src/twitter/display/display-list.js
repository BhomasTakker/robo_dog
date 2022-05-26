const { threadReply } = require("../tweet/send-tweet");

const createPrefaceTweet = (totalResults) => {
  return `Fetched top 10
      of ${totalResults} results`;
};

const createListItems = (articles) => {
  return articles.slice(0, 10).map((art) => {
    return `
        ${art.title}
        ${art.url}`;
  });
};

//Article list
const displayList = (result, originTweet) => {
  const { status, totalResults, articles } = result;
  const { author_id, id, text } = originTweet.data;

  if (status !== "ok") {
    return;
  }

  const reply = createPrefaceTweet(totalResults);
  const returnArticles = createListItems(articles);

  returnArticles.unshift(reply);
  threadReply(returnArticles, id);
};

module.exports = {
  displayList,
};
