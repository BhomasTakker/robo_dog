//seperate and simplify
//modify for multiple commands

const getCommand = (text) => {
  //just a list of fetch, fetch:all, fetch:video, commence, etc, and loop looking
  const command = "fetch";

  //use switch case

  if (text.toLowerCase().includes(command)) {
    const index = text.toLowerCase().indexOf(command) + command.length;
    if (index === -1) {
      return {
        command: null,
        index,
        str: text,
      };
    }
    return {
      command,
      index,
      str: text.slice(index),
    };
  }
};

module.exports = {
  getCommand,
};
