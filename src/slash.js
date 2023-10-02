import { Collection, Events, REST, Routes } from 'discord.js';

export async function registerCommands(token, clientId, commands) {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('SLASH Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log('SLASH Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

export function handleCommands(client, commands) {
  client.commands = new Collection();
  commands.forEach(command => {
    client.commands.set(command.data.name, command);
  });
};

export function registerListeners(client) {
  client.once(Events.ClientReady, c => {
    console.log(`ONCE Ready once! Logged in as ${c.user.tag}`);
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  });

  // client.on(Events.MessageCreate, message => {
  //   console.log(`${message.author.tag} sent: ${message.content}`);
  // });
}

export function registerEverything(commands, client, discord_token, client_id) {
  handleCommands(client, commands);
  (async () => {
    await registerCommands(discord_token, client_id, commands.map(({ data }) => data));
  })();
  registerListeners(client);
}