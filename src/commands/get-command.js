//seperate and simplify
//modify for multiple commands

const getCommand = (text) => {
  //just a list of fetch, fetch:all, fetch:video, commence, etc, and loop looking
  const command = "fetch "; //enum / needs a space else returns before better matches
  const newsCommand = "fetch:news";
  const fetchVid = "fetch:video";

  const fetchAudio = "fetch:audio";
  const fetchPodcast = "fetch:podcast";
  //omg do a loop man

  //there's a better way of doing this / a for loop
  if (text.toLowerCase().includes(fetchVid)) {
    const index = text.toLowerCase().indexOf(fetchVid) + fetchVid.length; //what's this for?
    return {
      command: fetchVid,
      index,
      str: text.slice(index),
    };
  }
  if (text.toLowerCase().includes(command)) {
    const index = text.toLowerCase().indexOf(command) + command.length;
    return {
      command,
      index,
      str: text.slice(index),
    };
  }
  if (text.toLowerCase().includes(newsCommand)) {
    const index = text.toLowerCase().indexOf(newsCommand) + newsCommand.length;
    return {
      command: newsCommand,
      index,
      str: text.slice(index),
    };
  }

  if (text.toLowerCase().includes(fetchAudio)) {
    const index = text.toLowerCase().indexOf(fetchAudio) + fetchAudio.length;
    return {
      command: fetchAudio,
      index,
      str: text.slice(index),
    };
  }
  if (text.toLowerCase().includes(fetchPodcast)) {
    const index =
      text.toLowerCase().indexOf(fetchPodcast) + fetchPodcast.length;
    return {
      command: fetchPodcast,
      index,
      str: text.slice(index),
    };
  }

  return {
    command: "null",
    index: 0,
    str: "",
  };
};

module.exports = {
  getCommand,
};
