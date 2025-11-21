// index.js
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// load commands
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath, { recursive: true });
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const cmd = require(path.join(commandsPath, file));
  if (cmd?.data && cmd?.execute) {
    client.commands.set(cmd.data.name, cmd);
    console.log('Loaded command', cmd.data.name);
  }
}

// load events
const eventsPath = path.join(__dirname, 'events');
if (!fs.existsSync(eventsPath)) fs.mkdirSync(eventsPath, { recursive: true });
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
  const ev = require(path.join(eventsPath, file));
  // events export { name: Events.* , execute(client, ...args) }
  if (ev.once) client.once(ev.name, (...args) => ev.execute(client, ...args));
  else client.on(ev.name, (...args) => ev.execute(client, ...args));
  console.log('Loaded event', ev.name);
}

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error('DISCORD_BOT_TOKEN missing in env!');
  process.exit(1);
}

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(token);
  const commands = [];
  for (const f of commandFiles) {
    const cmd = require(path.join(commandsPath, f));
    if (cmd && cmd.data) commands.push(cmd.data.toJSON());
  }

  try {
    console.log('Registering commands...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID || 'temp'),
      { body: commands }
    );
    console.log('Commands registered.');
  } catch (err) {
    console.error('Failed registering commands', err);
  }
}

client.login(token).then(() => {
  if (process.env.DISCORD_CLIENT_ID) registerCommands();
}).catch(err => {
  console.error('Login failed', err);
});
