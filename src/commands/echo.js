import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Responds with user name")

export async function execute(interaction) {
  const username = interaction.user.username;
  const joinedAt = interaction.member.joinedAt;
  await interaction.reply(`${username} first joined at ${joinedAt.toLocaleString()}`)
}