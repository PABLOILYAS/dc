/**
          _____                    _____          
         /\    \                  /\    \         
        /::\    \                /::\    \        
       /::::\    \              /::::\    \       
      /::::::\    \            /::::::\    \      
     /:::/\:::\    \          /:::/\:::\    \     
    /:::/__\:::\    \        /:::/__\:::\    \    
   /::::\   \:::\    \      /::::\   \:::\    \   
  /::::::\   \:::\    \    /::::::\   \:::\    \  
 /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \ 
/:::/  \:::\   \:::|    |/:::/  \:::\   \:::\____\
\::/   |::::\  /:::|____|\::/    \:::\   \::/    /
 \/____|:::::\/:::/    /  \/____/ \:::\   \/____/ 
       |:::::::::/    /            \:::\    \     
       |::|\::::/    /              \:::\____\    
       |::| \::/____/                \::/    /    
       |::|  ~|                       \/____/     
       |::|   |                                   
       \::|   |                                   
        \:|   |                                   
         \|___|                                   
                            
 */



const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send(' Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to PABLO: http://localhost:${port}`);
  console.log(`🔗 Powered By PABLO`);
});


const statusMessages = ["Royal Flush Bot","RF TACTICS"];


let currentIndex = 0;
const channelId = '';

async function login() {
  try {
    await client.login(process.env.token);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}


function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨ROYAL FLUSH BOT`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();
