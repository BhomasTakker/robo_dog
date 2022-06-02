const { threadReply } = require("../tweet/send-tweet");

//fetched input/default or returned if < 10
const createPrefaceTweet = (totalResults) => {
  return `Fetched top 5
      of ${totalResults} results`;
};

//magic number - get from input or defaults
//${art.title}
const createListItems = (videos) => {
  return videos.slice(0, 5).map((vid) => {
    const { videoId } = vid.id;
    //return text and urls
    //neither worked perfectly - when viewing as a reply it's just a url - when main tweet it's video link
    return `
        https://youtu.be/${videoId}`;
    return `
        https://www.youtube.com/watch?v=${videoId}?t=1`;
  });
};

//Article list
const displayVideoList = (result, originTweet) => {
  const { regionCode, pageInfo, nextPageToken, etag, kind, items } = result;
  const { totalResults, resultsPerPage } = pageInfo;
  const { author_id, id, text } = originTweet.data;

  if (!items || items.length <= 0) {
    return;
  }

  console.log(result);

  const reply = createPrefaceTweet(totalResults);
  const returnItems = createListItems(items);

  returnItems.unshift(reply);
  threadReply(returnItems, id);
};

module.exports = {
  displayVideoList,
};
