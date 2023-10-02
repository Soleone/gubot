import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { registerCommands, handleCommands, registerListeners, registerEverything } from './src/slash.js';
import * as echo from './src/commands/echo.js';
import * as ping from './src/commands/ping.js';
import * as poll from './src/commands/poll.js';

const { CLIENT_ID, DISCORD_TOKEN, SERVER_ID } = process.env;

// Register new commands here:
const commands = [
  echo,
  ping,
  poll,
]

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
registerEverything(commands, client, DISCORD_TOKEN, CLIENT_ID);
client.login(DISCORD_TOKEN);