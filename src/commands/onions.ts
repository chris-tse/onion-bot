import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { Command } from '../interfaces/Command'

const ONION_DEATH_TIME = 24 * 60 * 60 * 1000 // 24 hours in millis
const INTERVALS = [1 / 2, 3 / 4, 7 / 8, 15 / 16, 31 / 32]

let timers: NodeJS.Timeout[]

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
			if (timers) {
				timers.forEach(timer => {
					clearTimeout(timer)
				})
			}
			reply.setTitle('Onions watered')
			reply.setDescription('よくできました！ Well done! Timer has been reset for 24 hours.')
		}
		reply.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })

		await interaction.editReply({ embeds: [reply] })

		timers = INTERVALS.map(interval => {
			return setTimeout(() => {
				channel?.send(`Water the onion. There are ${ONION_DEATH_TIME - ONION_DEATH_TIME * interval}ms left `)
			}, ONION_DEATH_TIME * interval)
		})
	},
}
