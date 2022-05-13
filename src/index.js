const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('../config/config.json');

// Instancie le client Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	// met le nom de la commande dans la collection
	// et laisse le client executer la commande
	// en fonction de la commande.
	client.commands.set(command.data.name, command);
}

// S'il y a une commande slash d'éxécutée
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	// Pas de commande correspondante
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		// S'execute si le code de la commande plante (le bot peut continuer à fonctionner dans certains cas; dans tous les cas, si ça arrive cette erreur, skill issue ou js moment)
		console.error(error);
		await interaction.reply({ content: `Il y a eu un problème lors de l'execution de la commande.`, ephemeral: true });
	}
});

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);
