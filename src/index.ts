import { Client, Intents } from 'discord.js'
import { validateEnv } from './utils/validateEnvs';

(async () => {
	if (!validateEnv()) return

	const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

	bot.on('ready', () => {
		console.log('Connected to Discord')
	})

	await bot.login(process.env.BOT_TOKEN)
})();
