# NyTier Discord Bot

A professional Discord bot for managing player evaluation queues with role-based controls and automated testing workflows.

## Features

- **Setup System** - Configure queue, results, and control channels per server
- **Queue Management** - 10-player queue with multiple gamemode support
- **Persistent Buttons** - Control panel and queue buttons that update in place
- **Evaluation Results** - Professional embed displays with tester tracking
- **Ticket System** - Private evaluation channels for testers and players
- **Multi-Server Support** - Works on any Discord server

## Setup Instructions

### 1. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it "NyTier"
3. Go to "Bot" section and click "Add Bot"
4. Enable these Privileged Gateway Intents:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
5. Copy your bot token

### 2. Configure Environment

Set these secrets in your Replit environment:

- `DISCORD_BOT_TOKEN` - Your bot token from Discord Developer Portal
- `DISCORD_CLIENT_ID` - Your application ID (found in General Information)

### 3. Invite Bot to Server

Use this URL (replace YOUR_CLIENT_ID):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

### 4. Create Tester Role

In your Discord server, create a role named exactly `Tester` and assign it to staff who will manage evaluations.

### 5. Run Setup Command

In Discord, run `/setup` and select three channels:
- Queue Channel - Where players join/leave queue
- Results Channel - Where evaluation results are posted
- Control Channel - Where staff manage the queue

## Commands

### `/setup`
Configure the bot for your server (Tester role required)

**Options:**
- `queue_channel` - Channel for queue buttons
- `results_channel` - Channel for evaluation results
- `control_channel` - Channel for queue control panel

### `/evaluate`
Submit an evaluation result (Tester role required)

**Options:**
- `username` - Player username (required)
- `gamemode` - Gamemode tested (required)
- `region` - Player region (required)
- `ign` - In-game name (required)
- `new_tier` - New tier assigned (required)
- `previous_tier` - Previous tier (optional)

## Control Panel Buttons

### 🟢 Open Queue
Opens the queue for a selected gamemode. Sends notification to @everyone.

### 🔴 Close Queue
Closes the queue and clears all players.

### ⚙️ Start Test
Creates a private ticket channel with selected player.

### ❌ Kick Player
Removes a player from the queue.

## Queue Buttons

### ✅ Join Queue
Adds you to the queue (max 10 players).

### ❌ Leave Queue
Removes you from the queue.

## Supported Gamemodes

- Sword
- Axe
- Crystal
- Mace
- SMP
- Diasmp
- Nethpot
- UHC

## Project Structure

```
/commands
  setup.js          - Server configuration command
  evaluate.js       - Evaluation submission command
/utils
  configManager.js  - Config file management
  queueManager.js   - Queue state management
/events
  interactionCreate.js - Button and command handler
  ready.js          - Bot startup event
index.js           - Main bot file
config.json        - Guild configurations
```

## Technical Details

- Built with Node.js and discord.js v14
- Uses slash commands and interactive buttons
- Persistent message updates (no spam)
- In-memory queue storage
- File-based configuration per guild
- Professional embed formatting
