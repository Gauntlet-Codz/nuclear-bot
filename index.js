const Discord = require("discord.js");
const commando = require("discord.js-commando");
const PREFIX = ":";
const YTDL = require("ytdl-core");



function play(connection, message) {
    var server= servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
    }
    )};

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function(){
console.log("Ready")
});


bot.on("message", function(message) {
console.log(message.content);

if (message.author.equals(bot.user)) require;

if (message.content.startsWith(PREFIX)) require;

var args = message.content.substring(PREFIX.length).split(" ");

switch (args[0].toLowerCase()) {
case "rules":
message.channel.sendMessage("1. No name calling. 2. NEVER remove face protection. 3. Respect field host. 4. Call your hits.");
break;
case "gamemodes":
message.channel.sendMessage("1. TDM 2. Hostage 3. FFA 4. CTF")
break;
case "help":
message.channel.sendMessage("Use the [:] prefix to send a command. Simple commands include rules, and gamemodes.");
break;
case "about":
message.channel.sendMessage("Creator: Gauntlet")
break;
case "skip":
var server = servers[message.guild.id];

if (server.dispatcher) server.dispatcher.end();
break;
case "stop":
var server = servers[message.guild.id];

if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
break;
case "play":
    if (!args[1]) {
message.channel.sendMessage("Please provide a link");
return;
}

if (!message.member.voiceChannel) {
    message.channel.sendMessage("You must be in a voice channel");
    return;
}

var server = servers[message.guild.id];

server.queue.push(args[1]);

if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
   play(connection, message);
});

}
});

bot.login(process.env.BOT_TOKEN);
