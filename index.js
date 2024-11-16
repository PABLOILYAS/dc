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
const axios = require('axios');

// Initialize the client properly with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent // Needed to read message content
  ]
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('PABLOAD is a versatile Discord bot designed to assist in managing your server efficiently. With PABLOAD Bot, you can');
});
app.listen(port, () => {
  console.log(`🔗 Listening to PABLO: http://localhost:${port}`);
  console.log(`🔗 Powered By PABLO`);
});

const statusMessages = ["PABLOAD BOT", "🔗 Powered By PABLOILYAS", "ROYALFLUSH: https://discord.gg/jhGKtmNsvx 🔗"];

let currentIndex = 0;
const channelId = '1283463512064004138';

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
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: 'dnd',
  });

  const textChannel = client.channels.cache.get(channelId);
  
  if (textChannel instanceof TextChannel) {
    //textChannel.send(`Bot status is: ${currentStatus}`);
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

// A map for simple commands
const commands = {
  'pi ping': (message) => {
    message.channel.send('🏓 Pong!');
  },
};

// Message Listener - Made async to support await
client.on('messageCreate', async (message) => {  // Changed to async
  // Ignore messages from the bot itself to avoid loops
  if (message.author.bot) return;

  // If the message starts with a command that exists in the commands map
  const command = commands[message.content.toLowerCase()];
  
  if (command) {
    // Execute the command function
    command(message);
  }

  // Example of checking for specific text within a message
  if (message.content.includes('Royal Bot')) {
    message.channel.send('👑 Did someone mention Royal Bot?');
  }
  if (message.content.includes('بابلود')) {
    message.channel.send('👑 كيف اساعدك ؟');
  }
  if (message.content.includes('يا بوت')) {
    message.channel.send('👑 احترم حالك! بس كيف اساعدك ؟');
  }
  
  // Example: Trigger Claude replies with a specific command
  if (message.content.startsWith('!claude')) {
    const userMessage = message.content.replace('!claude', '').trim();

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/complete',
        {
          prompt: `You are Claude, a helpful and friendly assistant.\n\nUser: ${userMessage}\nClaude:`,
          model: 'claude-v1', // Replace with the version of Claude you're using
          max_tokens_to_sample: 200,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.completion;
      message.channel.send(reply.trim());
    } catch (error) {
      console.error('Error with Claude API:', error);
      message.channel.send('❌ Sorry, I couldn't process your message with Claude.');
    }
  }
});

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
