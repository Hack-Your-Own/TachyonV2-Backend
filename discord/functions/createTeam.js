require('dotenv').config();

const bot = require('../bot.js');
const { oneLine } = require('common-tags');

/**
 *  Setup a new project team
 * @param { string } teamName - The name of the team to be created
 * @param { Array<string> } memList - A string array containing the tags of the members to be added to the team
 * @returns { Promise<{success: boolean, message: string}> } json containing the groups role id and success status
 */

async function createTeam(teamName, memList) {
	const client = bot.getClient();
	// Test server id for now
	const guild = client.guilds.cache.get(process.env.SERVER);
	try {
		// create role with team name
		const role = await guild.roles.create({
			data: {
				name: teamName,
			},
		});

		// send a dm to all team members
		memList.forEach(async (id) => {
			(
				await guild.members.cache
					.find((member) => member.user.id === id)
					.roles.add(role)
			).send(`You have been added to ${teamName}!`);
		});

		// create team category
		const team = await guild.channels.create(teamName, { type: 'category', permissionOverwrites: [
			{
				id: client.user.id,
				allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
			},
			{
				id: role,
				allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
			},
			{
				id: guild.roles.everyone,
				deny: ['VIEW_CHANNEL'],
			},
		] });

		// const announcementsChannel = await guild.channels.create('announcements', { type: 'text', parent: team });
		// await announcementsChannel.send(`<@&${role.id}> Welcome to ${teamName}!`);

		const timelineChannel = await guild.channels.create('hyo-timeline', { type: 'text', parent: team });
		timelineChannel.send(oneLine`This channel contains your project timeline
		in terms of HYO’s program. To make sure everyone 
		is on the same page, react with a thumbs up whenever 
		you complete a stage of the deadline. If your entire 
		group is late or early, contact HYO Staff to line up future deadlines.`)
		.then((message) => {
			message.pin();
		});

		const linksChannel = await guild.channels.create('important-links', { type: 'text', parent: team });
		linksChannel.send(oneLine`Add all important links for your project here  
							(Github repo, important files, project proposal document, etc.)`)
								.then((message) => {
									message.pin();
								});

		const generalChannel = await guild.channels.create('general', { type: 'text', parent: team });
		generalChannel.send(oneLine`Use this channel for introductions (pin them), meeting scheduling, 
							and for just hanging out! Get to know your teammates and make  
							sure you’re communicating with them often.`)
									.then((message) => {
										message.pin();
									});

		const projectChannel = await guild.channels.create('project', { type: 'text', parent: team });
		projectChannel.send(oneLine`Use this channel for all project discussions, project planning,  
							project proposal, requirements, and so on. We recommend 
							using a Github workflow for your project (more info in the 
							timeline) You can brainstorm here but don’t forget to make
							good use of #voice-chat as well!`)
									.then((message) => {
										message.pin();
									});

		const frontendChannel = await guild.channels.create('frontend', { type: 'text', parent: team });
		frontendChannel.send(oneLine`Default frontend team channel (can be removed or changed  
							to reflect however you have split up your group)`)
									.then((message) => {
										message.pin();
									});

		const backendChannel = await guild.channels.create('backend', { type: 'text', parent: team });
		backendChannel.send(oneLine`Default backend team channel (can be removed or changed  
							to reflect however you have split up your group)`)
									.then((message) => {
										message.pin();
									});

		const staffChannel = await guild.channels.create('hyo-staff', { type: 'text', parent: team });
		staffChannel.send(oneLine`Use this channel for communication with HYO staff.`)
		.then((message) => {
			message.pin();
		});

		const mentorChannel = await guild.channels.create('hyo-mentor', { type: 'text', parent: team });
		mentorChannel.send(oneLine`Use this channel for communication w/ mentors. 
							'Request a mentor via #HYO-Staff`)
									.then((message) => {
										message.pin();
									});

		await guild.channels.create('voice-chat', { type: 'voice', parent: team });

		return {
			success: true,
			message: { roleID: role.id, categoryID: team.id },
		};
	}
	catch (error) {
		console.log(error);
		return {
			success: false,
			message: error,
		};
	}
}

module.exports = createTeam;
