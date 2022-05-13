const fs = require('node:fs');

// Pour les quêtes à l'API discord
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { clientId, guildId, token } = require('../config/config.json');

// crée une collection pour les commandes
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// met le nom de la commande dans la collection dans la collection de commandes
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
}

// requête à l'API discord avec le token
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
