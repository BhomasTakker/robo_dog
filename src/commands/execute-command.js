//These two called from a news fetch command file
const { executeFetch, executeNewsFetch } = require("../twitter/fetch/fetch");
const { displayList } = require("../twitter/display/display-list");

const executeCommand = async (command, str, tweet) => {
  //change args
  console.log("executeCommand", command);
  switch (command) {
    case "fetch":
    case "fetch:news":
      executeNewsFetch(command, str, tweet);
      break;

    default:
      return;
  }
};

module.exports = {
  executeCommand,
};
