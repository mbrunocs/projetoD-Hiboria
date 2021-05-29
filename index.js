const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
client.commands = new Discord.Collection();
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
  client.user.setPresence({ game: { name: 'command', type: 0, url: 'discord.gg/7E5VQ2WCM6' } });
  //0 = Jogando
  //  1 = Transmitindo
  //  2 = Ouvindo
  //  3 = Assistindo
});

client.on("message", async message => {

  if (message.channel.id !== config.channelId) return; //Verifica o canal principal
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);
  } catch (err) {
    console.error("Erro:" + err);
  }

  // comando ping
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token