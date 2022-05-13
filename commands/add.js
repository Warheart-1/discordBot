const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');    

// création d'une commande
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Proposez un anime à regarder.')
        .addStringOption(option => //correspond à l'option de la commande (semblable à un argument)
            option.setName('anime')
                .setDescription('Le nom de l\'anime à ajouter.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const anime = interaction.options.getString('anime'); // récupère l'option de la commande, ici un string (qui a été définie plus haut)
        const file = fs.readFileSync('./test/test.json');
        const animes = JSON.parse(file);
        animes.name.push(anime);
        fs.writeFileSync('./test/test.json', JSON.stringify(animes));
        await interaction.reply(`${anime} a été ajouté à la liste.`);       
        console.info("ce que contient le fichier test.json : " + animes.name)   
    }
}