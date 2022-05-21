import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../interfaces/Command'

const ONION_DEATH_TIME = 24 * 60 * 60 * 1000 // 24 hours in millis

let currentTimer: NodeJS.Timeout

export const onions: Command = {
	data: new SlashCommandBuilder()
		.setName('onion')
		.setDescription('Run when onions have been watered to reset timer')
		.addStringOption(option =>
			option.setName('action').setDescription('"water" to reset timer, "check" to see time remaining')
		),
	run: async interaction => {
		await interaction.deferReply()
		const { user, channel } = interaction
		const action = interaction.options.getString('action')

		const reply = new MessageEmbed()

		if (action === 'water') {
			clearTimeout(currentTimer)
			reply.setTitle('Message title')
			reply.setDescription('Some description')
		}
		reply.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })

		await interaction.editReply({ embeds: [reply] })

		currentTimer = setTimeout(() => {
			channel?.send('water da onion')
		}, ONION_DEATH_TIME)
	},
}
