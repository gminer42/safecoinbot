const Discord = require("discord.js");

const client = new Discord.Client();
 
const config = require("./config.json");

var fs = require('fs');

client.on("ready", () => {
  // Message if bot starts and logs in successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // Ignore other bots. This also ignore itself
  if(message.author.bot) return;

  // Ignore any message that does not start with prefix
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here separate "command" name and "arguments" for the command 

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command == "help"){
    // bot returns help info 
    message.channel.send("**Available Commands:**\n \n`!block` - Current block height \n`!halve` - Days to block reward halving \n`!diff` - Current block difficulty \n`!nethash` - Current network hashrate")
  }

  if(command == "block"){
    // makes the bot return the current block
    fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
    if (error){
        throw error;
    }
    mininginfo = JSON.parse(data);
    message.channel.send("Current block is "+ mininginfo.blocks) 
    });
  }
  
  if(command == "halve"){
    // makes the bot return the days for block reward halving
    fs.readFile('./mininginfo.json', 'utf8', function(error, data) {
    if (error){
        throw error;
    }
    mininginfo = JSON.parse(data);
    message.channel.send(((123840 - (mininginfo.blocks % 123840)) / (24*60)).toFixed(2) + " days left until block reward halving")
    });
  }
  
  if(command == "diff"){
    // makes the bot return the current difficulty
    fs.readFile('./mininginfo.json', 'utf8', function(error, data) {
    if (error){
        throw error;
    }
    mininginfo = JSON.parse(data);
    message.channel.send("Current difficulty is "+ mininginfo.difficulty)
    });
  }
  
  if(command == "nethash"){
    // makes the bot return the current nethash
    fs.readFile('./mininginfo.json', 'utf8', function(error, data) {
    if (error){
        throw error;
    }
    mininginfo = JSON.parse(data);
    message.channel.send("Current network hash is "+ mininginfo.networkhashps / 1000 +" ksol/s")
    });
  }

  if(command == "lambo"){
    // when lambo
    fs.readFile('./mininginfo.json', 'utf8', function(error, data) {
    if (error){
        throw error;
    }
   // mininginfo = JSON.parse(data);
    message.channel.send("**Beep Boop - Boop Beep** \n \n To lambo, one must hodl.")
    });
  }

});

client.login(config.token);
           
