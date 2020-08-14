/* eslint-disable no-mixed-spaces-and-tabs */
require('dotenv').config();

const Discord = require('discord.js');
// const { resolve } = require('path');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.login(process.env.DISCORD_SECRET);

const getClient = () => client;

exports.getClient = getClient;