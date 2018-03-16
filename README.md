# safecoin client bot

Enable a simple discord bot via client. It uses a exported json file from the client command getmininginfo, it requieres a daemon node with a client available.

## Install latest version of node.js

```
sudo apt-get install npm

sudo npm install n -g

sudo n stable
```


## Run a safecoin node

```
cd safecoin 

sudo npm install nohup

nohup ./safecoind &

```
Let the wallet get synced 


## Run the json file generator

```
cd safecoin

nohup bash mininginfo.sh &
```
Now you have a json file mininginfo.json

## Enable the discord bot
```
npm init 

npm install discord.js

nohup node app.js &
```

## Invite the bot to the server

https://discordapp.com/oauth2/authorize?&client_id=INSERTHEREBOTCLIENTID&scope=bot&permissions=0
