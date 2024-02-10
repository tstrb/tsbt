// help.js

const helpConfig = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "GUIDE",
  usage: "Help [page] ou [command]",
  credits: 'TsantaBot',
};

async function helpFunction({ api, event, enableCommands, args, Utils, prefix }) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `LISTES COMMANDES : 
 (bit.ly/tsantabot)

`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ➤ ${prefix}${commands[i]} 
`;
      }
      helpMessage += `
SRC= TsantaBot 

`;
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ➤ ${prefix}${eventCommand} 
`;
      });
      helpMessage += `
📄 Page ${page}/${Math.ceil(commands.length / pages)}.
 🗒 Pour voir la page suivante, tapez ${prefix}help [numéro de la page] •Ex: help 2. 
 💡 Pour voir à propos d'une commande spécifique, tapez '${prefix}help [nom du commande]' •Ex: help ai. 
 📂 Raha hijery ny fomba fampiasana ny commandes dia soratana mitokana fotsiny ilay commande. •Ex: Ai`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `LISTES COMMANDES : 
 (bit.ly/tsantabot)

`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ➤ ${prefix}${commands[i]} 
`;
      }
      helpMessage += `
 //Event List:

`;
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ➤ ${prefix}${eventCommand} 
`;
      });
      helpMessage += `
Page ${page} of ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}
` : '';
        const descriptionMessage = description ? `Description: ${description}
` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}
` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}
` : '';
        const versionMessage = version ? `➛ Version: ${version}
` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)
` : '';
        const message = ` 「 Command 」

➛ Name: ${name}
${versionMessage}${roleMessage}
${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('🤔 | Commande non trouvé ou n\'existe pas !', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleEventFunction({ api, event, prefix }) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '▶️ Mon Prefix est: ' + prefix : " ▶️ Désolé, J'ai  pas un prefix. bit.ly/tsantabot  ";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}

module.exports = {
  config: helpConfig,
  run: helpFunction,
  handleEvent: handleEventFunction
};
