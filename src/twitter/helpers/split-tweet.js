//Get data from tweet
const splitTweet = (text) => {
  //split main search and filters delim ::
  const mainSplit = text.split("::");
  // console.log("mainSplit ", mainSplit);
  //left side search
  const searchString = mainSplit[0];
  // console.log("searchString ", searchString);
  //right side filters
  const filtersString = mainSplit[1] || null;
  // console.log("filtersString ", filtersString);

  //get array of search terms
  const searchArray = searchString.trim().split("&&");

  //   const q = searchArray.join("AND");
  return {
    searchArray,
    filtersString,
  };
};

module.exports = { splitTweet };
