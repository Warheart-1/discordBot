const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Supprimez un anime de la liste.')
        .addStringOption(option =>
            option.setName('anime')
                .setDescription('Le nom de l\'anime à supprimer.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const anime = interaction.options.getString('anime');
        const file = fs.readFileSync('./test/test.json');
        const animes = JSON.parse(file);
        if (animes.name.indexOf(anime) !== -1) {// regarde si l'anime entré par l'utilisateur est dans le fichier json, retourne 1
            animes.name.splice(animes.name.indexOf(anime), 1);
            fs.writeFileSync('./test/test.json', JSON.stringify(animes));
            await interaction.reply(`${anime} a été supprimé de la liste.`);
        } else { // Si ça retourne  -1, c'est qu'il n'y a pas d'anime dans le fichier
            await interaction.reply(`${anime} n'est pas dans la liste.`);
        }
        console.info("ce que contient le fichier test.json : " + animes.name) 
    }
}