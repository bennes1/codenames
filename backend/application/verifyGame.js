/**
 * verifyRoles
 * gets all red and blue codemasters
 * @param roles -- roles in the game
 * @return int, int -- number of codemasters
 */
const verifyRoles = (roles) => {
  let redCodemasters = 0;
  let blueCodemasters = 0;

  roles.forEach((elem, index) => {
    if (elem.role === "RM") {
      redCodemasters++;
    } else if (elem.role === "BM") {
      blueCodemasters++;
    }
  });

  return [redCodemasters, blueCodemasters];
};

/**
 * getRoleMessages
 * Get the messages from having no or more than one codemasters.
 * @param roles -- the roles in the game
 * @return [string] -- array of messages
 */
const getRoleMessages = (roles) => {
  const [redCodemasters, blueCodemasters] = verifyRoles(roles);
  let messages = [];
  switch(redCodemasters) {
    case 0:
      messages.push("A red codemaster is required.");
    case 1:
      break;
    default:
      messages.push("There can only be one red codemaster.");
      break;
  }

  switch(blueCodemasters) {
    case 0:
      messages.push("A blue codemaster is required.");
      break;
    case 1:
      break;
    default:
      messages.push("There can only be one blue codemaster.");
      break;
  }

  return messages;
};

module.exports = {
  getRoleMessages
};
