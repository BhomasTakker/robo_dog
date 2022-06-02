//These two called from a news fetch command file
const { executeNewsFetch } = require("../twitter/fetch/fetch");
const { executeMediaStackFetch } = require("../twitter/fetch/fetch-news");
const { executePodcastFetch } = require("../twitter/fetch/fetch-podcast");
const { executeVideoFetch } = require("../twitter/fetch/fetch-video");

const executeCommand = async (command, str, tweet) => {
  //fetch:rules - forgiven i.e. news return available filters etc
  //fetch:youtube
  console.log("executeCommand", command);
  switch (command.trim()) {
    case "fetch":
      executeMediaStackFetch(command, str, tweet);
      break;
    case "fetch:news":
      executeNewsFetch(command, str, tweet);
      break;

    case "fetch:video":
      executeVideoFetch(command, str, tweet);
      break;
    case "fetch:audio":
    case "fetch:podcast":
      executePodcastFetch(command, str, tweet);
      break;
    default:
      return;
  }
};

module.exports = {
  executeCommand,
};
