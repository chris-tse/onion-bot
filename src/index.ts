import { Client, Intents, Interaction } from 'discord.js'
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';
import { validateEnv } from './utils/validateEnvs';

(async () => {
	if (!validateEnv()) return

	const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

	bot.on('ready', async () => await onReady(bot))

	bot.on('interactionCreate', async (interaction: Interaction) => await onInteraction(interaction))

	await bot.login(process.env.BOT_TOKEN)
})();
