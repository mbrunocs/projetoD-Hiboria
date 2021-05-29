
module.exports.run = async (client, message, args) => {
  console.log(client.log);
  message.author.send("Para de mandar msg!");
  console.log(client.commands);
};