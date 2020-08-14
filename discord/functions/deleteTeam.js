require('dotenv').config();

const bot = require('../bot.js');

/**
 * Delete a team role and all its associated channels
 * @param { string } teamId - The id of the team role on discord server
 * @param { string } categoryId - The id of the category that holds the team channels
 * @param { string } reason - The reason for deleting the team
 * @returns { Promise<{success: boolean, message: string}> } json containing success status and error/success message
 */
async function deleteTeam(teamId, categoryId, reason) {
	// create discordjs instance
	const client = bot.getClient();
	// get guild on server
	const guild = client.guilds.cache.get(process.env.SERVER);
	try {
		// get the team category from id
		const categoryChannel = client.channels.cache.get(categoryId);
		// get all the channels in the team category
		const teamChannels = categoryChannel.children.array();
		// get the team role object
		const teamRole = guild.roles.cache.get(teamId);
		// get all the users with the team role
		const guildMembersWithRole = teamRole.members.array();
		// push each member with the role to an array for easy dm'ing
		const teamMembers = [];
		guildMembersWithRole.forEach(member => teamMembers.push(member));

		// delete each channel in the team category
		await teamChannels.forEach(async channel => await channel.delete(reason));
		// delete the team category
		await categoryChannel.delete(reason);
		// delete the team role
		await teamRole.delete();
		// send each team member a message informing them about the deletion with a reason
		teamMembers.forEach(member => member.send(`Your team has been deleted for the following reason: ${reason}`));
		return {
			success: true,
			message: 'Team was successfully deleted',
		};
	}
	// if error, return error message
	catch (error) {
		return {
			success: false,
			message: error,
		};
	}
}

module.exports = deleteTeam;