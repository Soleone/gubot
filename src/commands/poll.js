import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("poll")
  .setDescription("Asks a question users can vote up or down")
  .addStringOption(option =>
    option
      .setName("question")
      .setDescription("The question displayed to all users to react with")
      .setRequired(true)
  );

export async function execute(interaction) {
  const question = interaction.options.getString("question");

  await interaction.reply(question)

  const reply = await interaction.fetchReply()
  reply.react('👍');
  reply.react('👎');
};