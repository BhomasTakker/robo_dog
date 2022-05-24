const fetch = require("node-fetch");

const executeFetch = async (text) => {
  //const textArray = text.split(' ');
  //news fetch

  //split main search and filters delim ::
  const mainSplit = text.split("::");
  //left side search
  const searchString = mainSplit[0];
  //right side filters
  const filtersString = mainSplit[1] || null;

  //get array of search terms
  const searchArray = searchString.trim().split("&&");

  console.log("searchArray", searchArray);
  //   console.log("filtersString", filtersString);
  //if filterString exists
  if (filtersString) {
    const filters = filtersString.trim().split(" ");
    console.log("filters", filters);
    //leaves us with from:xxxxxx to:xxxxxx lang:xxxxx etc
    //which we can act on
  }

  //if!!
  const q = searchArray.join("AND");
  try {
    return (response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEWSAPI_KEY}`
    ));
  } catch (error) {
    console.error("API load error ", error);
    return null;
  }
};

module.exports = {
  executeFetch,
};
