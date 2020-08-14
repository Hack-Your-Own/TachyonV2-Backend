const bot = require('../bot.js');

/**
 * Converts name into id 
 * @param { string } member - User tag (NAME#0001).
 * @returns { Promise<{ title: string, message: string}> } json on whether it was successful or not and shows message.
 */
async function convertNameToID(member) {
  const client = bot.getClient();

  try {
    const temp = client.users.cache.find((human) => human.tag === member);
    return {
      title: 'Success',
      message: `ID: ${temp}`,
    };
  }
  catch (e) {
    return {
      title: 'Error',
      message: `Reason: ${e.message}`,
    };
  }
}

module.exports = convertNameToID;
