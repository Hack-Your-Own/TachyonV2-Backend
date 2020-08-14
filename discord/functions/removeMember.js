require('dotenv').config();

const bot = require('../bot.js');

// Used in /commands/volunteers/deleters/removeRole
/**
 * Removes a user from a role.
 * @param { string } member - Either user id or user tag (NAME#0001).
 * @param { string } role - Either role id or role name.
 * @returns { Promise<{ title: string, message: string}> } json on whether it was successful or not and shows message.
 */
async function removeMember(member, role) {
	const client = bot.getClient();
	// Test server id for now
	const guild = client.guilds.cache.get(process.env.SERVER);

	try {
		// If the member given is in NAME#0001 form then convert to id form.
		if(member.includes('#')) {
			const temp = client.users.cache.find(human => human.tag === member);
			member = temp.id;
		}

		// If the string doens't have all numbers aka not an id...
		if(!(/^\d/.test(role))) {
			// Convert to id.
			const temp = guild.roles.cache.find(gRole => gRole.name === role);
			role = temp.id;
		}
		const user = await guild.members.fetch(member);
		const loadedRole = await guild.roles.fetch(role);

		if (user._roles.includes(role)) {
			await user.roles.remove(role);
			return {
				title: 'Role Removed',
				message: `${user.user.tag} was removed from ${loadedRole.name}.`,
			};
		}
		else {
			throw { message: 'User does not have the role.' };
		}
	}
	catch (e) {
		return {
			title: 'Error',
			message: `Reason: ${e.message}`,
		};
	}
}

module.exports = removeMember;