const token = "NDMwNDExMDYyODY1ODIxNjk3.DaP0MA.bE-6_VCbKMxpEoGOpoVNfhPUbAw"; 
const prefix = "!";

var client = new(require("discord.js")).Client();
var accounts;
var fs = require('fs');

var help = require("./data.js").help;
var links = require("./data.js").links;
var pool = require("./data.js").pool;

function parseMessage(msg, sender, msgObj) {
    switch (msg[0]) {
        case "help":
        case "рудз":
            if (msg.length == 2) {
                msgObj.reply(help(msg[1]));
        	break;
            } else if (msg.length == 1) {
                msgObj.reply(help());
                break;
            }
        case "pool":
        case "зщщд":
            if (msg.length == 2 ) {
		if (pool(msg[1]) == false ) {
		    msgObj.reply(" I wanted to send a personal message, but there was no useful information. You made a mistake when entering the command. Go back and fix it!");
		} else {
                    msgObj.author.send(pool(msg[1]));
	            msgObj.reply(" I sent you a personal message.");
		}
        	break;
            } else if (msg.length == 1) {
                msgObj.author.send(pool());
                msgObj.reply(" I sent you a personal message.");
        	break;
	    }
        case "links":
        case "дштлы":
            if (msg.length == 1) {
                msgObj.author.send(links());
                msgObj.reply(" I sent you a personal message.");
        	break;
            } 
	case "lambo":
	case "дфьищ":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep** \n \n To lambo, one must hodl.");
        	break;
            } 
	case "beer":
	case "иуук":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep** \n **SafeCion** The most interesting coin in the world!");
        	break;
            } 
	case "bot?":
	case "bot!":
	case "бот?":
	case "бот!":
	case "ищт?":
	case "ище!":
	case "bot":
	case "ище":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep** \n**I'm here!**");
        	break;
            } 
	case "moon":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep** \n**Moon is soon!**");
        	break;
            } 
	case "ьщщт":
            if (msg.length == 1) {
                msgObj.reply(" Поставь себе Punto Switcher :-)");
        	break;
            } 


	case "reward":
	case "куцфкв":
            if (msg.length == 1) {
                msgObj.reply(" Current block reward is **128** SAFE");
        	break;
            } 

        case "block":
        case "идщсл":
            if (msg.length == 1) {
	        fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
		    if (error){
	    	        throw error;
		    }
		    mininginfo = JSON.parse(data);
                    msgObj.reply(" Current block is **"+ mininginfo.blocks +"**");
	        });
            break;
            } 

        case "halve":
        case "рфдму":
            if (msg.length == 1) {
	        fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
		    if (error){
	    	        throw error;
		    }
		    mininginfo = JSON.parse(data);
                    msgObj.reply(" **"+((123840 - (mininginfo.blocks % 123840)) / (24*60)).toFixed(2) + "** days left until block reward halving");
	        });
            break;
            } 

        case "diff":
        case "вшаа":
            if (msg.length == 1) {
	        fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
		    if (error){
	    	        throw error;
		    }
		    mininginfo = JSON.parse(data);
                    msgObj.reply(" Current difficulty is "+ mininginfo.difficulty);
	        });
            break;
            } 

        case "nethash":
        case "туерфыр":
            if (msg.length == 1) {
	        fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
		    if (error){
	    	        throw error;
		    }
		    mininginfo = JSON.parse(data);
                    msgObj.reply(" Current network hash is **"+ mininginfo.networkhashps / 1000 +"** kSol/s");
	        });
            break;
            } 

        default:
            msgObj.reply(" Command not recognized. \"!help\" to get a list of commands or edit your last message.");
    }
}

function recognizeMessage(msg) {
    if (msg.content.toLowerCase().substr(0, 1) !== prefix) {
        return;
    }
    var sender = msg.author.toString();
    var message = msg.content.substring(1, msg.content.length).toLowerCase().split(" ").filter((item, index, inputArray) => {
       return item !== "";
    });
    for (var i = 0; i < message.length; i++) {
        message[i] = message[i].split("\r")[0].split("\n")[0];
    }
    parseMessage(message, sender, msg);
}
client.on("message", (msg) => {
    recognizeMessage(msg);
});
client.on("messageUpdate", (oldMsg, msg) => {
    recognizeMessage(msg);
});
client.login(token);
