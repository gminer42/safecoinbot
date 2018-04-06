const token = "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"; 
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
                msgObj.reply("\n**Beep Boop - Boop Beep** \nTo lambo, one must hodl.");
        	break;
            } 

	case "beer":
	case "иуук":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep** \n**SafeCion** The most interesting coin in the world!");
        	break;
            } 

	case "bot?":
	case "bot!":
	case "bot":
	case "бот?":
	case "бот!":
	case "бот":
	case "ище&":
	case "ище!":
	case "ище":
            if (msg.length == 1) {
                msgObj.reply("\n**Beep Boop - Boop Beep**\n**I'm here!**");
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
		    if (IsJsonString(data)) { 
		        mininginfo = JSON.parse(data);
                	msgObj.reply(" Current block is **"+ mininginfo.blocks +"**");
		    } else {
			msgObj.reply(" data is not available.")
		    }
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
		    if (IsJsonString(data)) { 
			mininginfo = JSON.parse(data);
                	msgObj.reply(" **"+((123840 - (mininginfo.blocks % 123840)) / (24*60)).toFixed(2) + "** days left until block reward halving");
		    } else {
			msgObj.reply(" data is not available.")
		    }
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
		    if (IsJsonString(data)) { 
			mininginfo = JSON.parse(data);
                	msgObj.reply(" Current difficulty is "+ mininginfo.difficulty);
		    } else {
			msgObj.reply(" data is not available.")
		    }
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
		    if (IsJsonString(data)) { 
			mininginfo = JSON.parse(data);
                	msgObj.reply(" Current network hash is **"+ mininginfo.networkhashps / 1000 +"** kSol/s.");
		    } else {
			msgObj.reply(" data is not available.")
		    }
		});
                break;
            } else if (msg.length == 2 && Number(msg[1]) ) {
	        fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
		    if (error){
	    	        throw error;
		    }
		    if (IsJsonString(data)) { 
			mininginfo = JSON.parse(data);
                	msgObj.reply(" Network hash is about **"+ mininginfo.networkhashps / 1000 +" kSol/s.**\nWith your hashrate **"+Number(msg[1])+" Sol/s**  you will get approximate **"+Math.round(100*(Number(msg[1]) / mininginfo.networkhashps) * 128 * 60) / 100 + " SAFE** per **hour** and **" +Math.round(100*(Number(msg[1]) / mininginfo.networkhashps) * 128 * 1440) / 100  + " SAFE** per **day** at current network difficulty.\nThe further - the more difficult.");
    		    } else {
			msgObj.reply(" data is not available.")
		    }
		});
		break;
	    }

        default:
            msgObj.reply(" Command not recognized. \"!help\" to get a list of commands or edit your last message.");
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function recognizeMessage(msg) {

    fs.readFile('./mininginfo.json', 'utf8', function read(error, data) {
	if (error){
	    throw error;
	}
	if (IsJsonString(data)) { 
	    mininginfo = JSON.parse(data);
	    client.user.setActivity(mininginfo.networkhashps / 1000 +" kSol/s");
        } else {
	    client.user.setActivity("N/A kSol/s.")
	}
    });

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