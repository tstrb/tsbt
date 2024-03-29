module.exports.config = {
  name: "shell",
  version: "7.3.1",
  role: 1,
  aliases: ["term"],
  credits: "cliff",
  cooldown: 0,
  hasPrefix: false,
  description: "Run shell Commands",
};

module.exports.run = async function ({ api, event, args }) {
  const { exec } = require("child_process");

  // Define the array of admin sender IDs
  const admins = ["61552825191002"]; // Update admin IDs

  if (!admins.includes(event.senderID.toString())) {
    return api.sendMessage("⚠️ Acces for admin Only !", event.threadID, event.messageID);
  }

  let command = args.join(" ");

  if (!command) {
    return api.sendMessage("No command provided", event.threadID, event.messageID);
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
      return;
    }
    if (stderr) {
      api.sendMessage(`Stderr: ${stderr}`, event.threadID, event.messageID);
      return;
    }
    api.sendMessage(`Stdout: ${stdout}`, event.threadID, event.messageID);
  });
};
