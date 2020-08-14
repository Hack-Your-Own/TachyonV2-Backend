const express = require('express');
const app = express();

const deleteTeam = require('./functions/deleteTeam');
const createTeam = require('./functions/createTeam');
const addMember = require('./functions/addMember');
const removeMember = require('./functions/removeMember');
const convertNameToID = require('./functions/convertNameToID');
const getAllUsers = require('./functions/getAllUsers');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createTeam', async (req, res) => {
    const { teamName, memberList } = req.body;

	console.log(teamName, memberList);

	if (!teamName || !memberList) {
		return res.send({ success: false, message: `Missing Parameters\nTeam Name: ${teamName}\nMember List ${memberList}` });
	}

	const result = await createTeam(teamName, memberList);
	// console.log(result);

	return res.send(result);
})

app.post('/deleteTeam', async (req, res) => {
	const { teamID, categoryID, reason } = req.body;

	if (!teamID || !categoryID || !reason) {
		return res.send({ success: false, message: 'Missing Parameters' });
	}

	const result = await deleteTeam(teamID, categoryID, reason);
	// console.log(result);

	return res.send(result);
});

app.post('/addMember', async (req, res) => {
	const { member, role } = req.body;

	if (!member || !role) {
		return res.send({ success: false, message: `Missing Parameters\nMember: ${member}\nRole: ${role}` });
	}

	const result = await addMember(member, role);

	return res.send(result);
});

app.post('/removeMember', async (req, res) => {
	const { member, role } = req.body;

	if (!member || !role) {
		return res.send({ success: false, message: `Missing Parameters\nMember: ${member}\nRole: ${role}` });
	}

	const result = await removeMember(member, role);

	return res.send(result);
});

app.post('/convertNameToID', async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.send({ success: false, message: 'Missing Parameters' });
	}

	const result = await convertNameToID(name);
	// console.log(result);

	return res.send(result);
});

app.post('/getAllUsers', async (req, res) => {
	const result = await getAllUsers();
	// console.log(result);

	return res.send(result);
});

app.get('/', function(req, res, next) {
    res.send("HELLO WORLD");
})


module.exports = app;

