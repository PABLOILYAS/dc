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
  res.send(' PABLOAD is a versatile Discord bot designed to assist in managing your server efficiently. With PABLOAD Bot, you can');
});
app.listen(port, () => {
  console.log(`🔗 Listening to PABLO: http://localhost:${port}`);
  console.log(`🔗 Powered By PABLO`);
});


// Updated statusMessages to include type of activity and message
const statusMessages = [
  { type: ActivityType.Playing, message: "Battle Royale" },
  { type: ActivityType.Listening, message: "Royal Bot Commands" },
  { type: ActivityType.Watching, message: "ROYALFLUSH Server" },
  { type: ActivityType.Competing, message: "in a Dev Challenge" }
];

let currentIndex = 0;
const channelId = ''; // Make sure to fill in the channel ID

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

  // Set bot activity using the activity type and message
  client.user.setPresence({
    activities: [{ name: currentStatus.message, type: currentStatus.type }],
    status: 'dnd', // You can set this to 'online', 'idle', etc.
  });

  // Sending a message to the channel about the current status
  const textChannel = client.channels.cache.get(channelId);
  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus.message}`);
  } else {
    console.log('Text channel not found or invalid.');
  }

  // Update index to rotate through status messages
  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨ROYAL FLUSH BOT`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000); // Rotate status every 10 seconds
});

login();
