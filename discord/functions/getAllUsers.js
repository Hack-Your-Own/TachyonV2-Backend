require('dotenv').config();

const bot = require('../bot.js');

/**
 * Returns all users
 * @returns { Promise<{ title: string, message: json }> } json on whether it was successful or not and shows message.
 */
async function getAllUsers() {
  try {
    const client = bot.getClient();
    const guild = client.guilds.cache.get(process.env.SERVER);

    const users = await guild.members.fetch();

    const rower = users.map((role) => {
      // get the array of role names
      const roleCollection = role.roles.cache.map((role2) => {
        return role2.name;
      });
      // find index of @everyone
      const everyone = roleCollection.indexOf('@everyone');
      // get rid of the @everyone role.
			roleCollection.splice(everyone, 1);
			
			// If there is no Nickname, it would be null.
      const row = {
				'Discord Name': role.user.tag,
				'Discord Nickname': role.nickname,
				'Discord ID': role.user.id,
				'Roles': roleCollection,
      };

      return row;
    });

    return {
      title: 'Success',
      message: rower,
    };
  }
  catch (e) {
    return {
      title: 'Error',
      message: `Reason: ${e.message}`,
    };
  }
}

module.exports = getAllUsers;
