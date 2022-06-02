const fetch = require("node-fetch");
const { displayList } = require("../display/display-list");
const { splitTweet } = require("../helpers/split-tweet");

const applyFilters = (filtersString) => {
  let returnString = "";

  if (filtersString) {
    const convertedString = filtersString.replaceAll(":", "=");
    const parameterString = convertedString.trim().split(" ").join("&");

    //apply default filters if not set
    //or override if need be set
    parameterString += "&limit=25";
    parameterString += "&offset=0";
    parameterString += "&languages=en,-it";
    parameterString += "&sources=-dailymail,-Mail";

    parameterString += "&countries=gb";

    returnString = `&${parameterString}`;
  }

  return returnString;
};

const executeMediaStackFetch = async (command, str, tweet) => {
  const response = await executeFetch(str);
  const result = await response.json();

  console.log("str ", str);
  console.log("command ", command);
  console.log("result ", result);

  //   displayList(result, tweet);
};

//This needs to be split up -
const executeFetch = async (text) => {
  //const textArray = text.split(' ');
  //news fetch
  console.log("executeFetch MNediaStack ", text);
  //split main search and filters delim ::
  //   const mainSplit = text.split("::");
  //   // console.log("mainSplit ", mainSplit);
  //   //left side search
  //   const searchString = mainSplit[0];
  //   // console.log("searchString ", searchString);
  //   //right side filters
  //   const filtersString = mainSplit[1] || null;
  //   // console.log("filtersString ", filtersString);

  //   //get array of search terms
  //   const searchArray = searchString.trim().split("&&");

  const { searchArray, filtersString } = splitTweet(text);

  //use - to exclude
  const q = searchArray.join(",");

  //just need a function to provide url

  //need upgrade for https
  try {
    return (response = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${
        process.env.MEDIASTACK_API_KEY
      }&keywords=${q}${applyFilters(filtersString)}`
    ));
  } catch (error) {
    console.error("API load error ", error);
    return null;
  }
};

module.exports = {
  executeMediaStackFetch,
};
