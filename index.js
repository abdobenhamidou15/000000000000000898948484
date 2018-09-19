const Discord = require('discord.js');
const config = require('./config.json');
const disco = new Discord.Client();
const prefix = config.prefix;
const allowedUsers = config.allowedUsers;
const roles = config.roleToDisco;

disco.on("ready", () => {
    console.log("Discord role bot online! Created by i am toast.");
});

disco.on("message", message => {

  function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        return message.channel.sendMessage("where this fucking role");
      });
    });
  }

  if(message.content.startsWith(prefix + "rstart")) {
    if(allowedUsers.includes(message.author.id)) {
    setInterval(() => { discoRole(); }, config.ms);
    message.channel.sendMessage("rainbow color has been started");
  } else {
    message.reply(`:middle_finger: a fuck you`);
  }
} else

if(message.content.startsWith(prefix + "rstop")) {
  if(allowedUsers.includes(message.author.id)) {
  message.channel.sendMessage("rainbow color has been stopped");
  setTimeout(() => { console.log(process.exit(0)); }, 300);
} else {
  message.reply(`a fuck you `);
  }
}

console.log(message.author.id);

});



disco.login(process.env.token);
