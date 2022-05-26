const fetch = require("node-fetch");
const { displayList } = require("../display/display-list");

const applyFilters = (filtersString) => {
  let returnString = "";
  console.log(filtersString);
  console.log(typeof filtersString);

  if (filtersString) {
    const convertedString = filtersString.replaceAll(":", "=");
    const parameterString = convertedString.trim().split(" ").join("&");

    console.log("parameterString", parameterString);
    returnString = `&${parameterString}`;
    //leaves us with from:xxxxxx to:xxxxxx lang:xxxxx etc
    //which we can act on
  }

  return returnString;
};

const executeNewsFetch = async (command, str, tweet) => {
  const response = await executeFetch(str);
  const result = await response.json();

  console.log("str ", str);
  console.log("command ", command);

  displayList(result, tweet);
};

const executeFetch = async (text) => {
  //const textArray = text.split(' ');
  //news fetch
  // console.log("Execute search");
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

  const q = searchArray.join("AND");

  //just need a function to provide url

  try {
    return (response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}${applyFilters(
        filtersString
      )}&apiKey=${process.env.NEWSAPI_KEY}`
    ));
  } catch (error) {
    console.error("API load error ", error);
    return null;
  }
};

module.exports = {
  executeFetch,
  executeNewsFetch,
};
