//I feel like Audio - at least in this instance doesn't work - we need actual embedded in tweet

const fetch = require("node-fetch");
const { displayAudioList } = require("../display/display-audio-list");

//Get the podcast api I'd say

//thus far generic??
//(we haven't tested video params etc lol - in fairness nothing )
const applyFilters = (filtersString) => {
  let returnString = "";

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

const convertData = (data) => {
  const { count, total, results } = data;
  const modifidArray = results.map((res) => {
    const { audio, link, audio_length_sec, title_original } = res;
    return {
      url: link,
      length: audio_length_sec,
      title: title_original,
    };
  });

  return {
    totalResults: total,
    results: modifidArray,
  };
};
//why do we need command?
//Would there be a distinction? i.e. news a or b??
const executePodcastFetch = async (command, str, tweet) => {
  const response = await executeFetch(str);
  const result = await response.json();

  console.log("str ", str);
  console.log("command ", command);

  console.log("result ", result);

  const convertedData = convertData(result);

  //convert data?
  //list should just be output
  //displayVideoList(result, tweet);
  displayAudioList(convertedData, tweet);
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
  const searchArray = searchString.trim().split("&&"); //for you tube this a no

  const q = searchArray.join("AND");

  //just need a function to provide url

  try {
    return (response = await fetch(
      `https://listen-api.listennotes.com/api/v2/search?q=${q}${applyFilters(
        filtersString
      )}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ListenAPI-Key": process.env.LISTENNOTES_API_KEY,
        },
      }
    ));
  } catch (error) {
    console.error("API load error ", error);
    return null;
  }
};

module.exports = {
  executePodcastFetch,
};
