// Importing necessary modules
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.BOT_TOKEN;
const channelId = "1145045395588780044";
client.login(token);
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Kiểm tra các server mà bot đã tham gia
  client.guilds.cache.forEach((guild) => {
    console.log(`Guild: ${guild.name}, ID: ${guild.id}`);

    // Kiểm tra các kênh trong server
    guild.channels.cache.forEach((channel) => {
      console.log(
        `Channel: ${channel.name}, ID: ${channel.id}, Type: ${channel.type}`
      );
    });
  });
});

app.get("/", (req, res) => {
  res.send("BOT DISCORD");
});
app.use("/dashboard", express.static(path.join(__dirname, "views")));
app.post("/send-message", (req, res) => {
  const { content } = req.body;
  const channel = client.channels.cache.get(channelId);
  const embed = new EmbedBuilder()
    .setTitle("DVC Thông báo")
    .setDescription(`Cập nhật tool mới nhất!!!`)
    .addFields({
      name: "\u200B",
      value: `• ${content}`,
    })
    .setColor("#0099ff");

  if (channel) {
    channel.send({ embeds: [embed] });
    res.send("Message sent!");
  } else {
    res.send("Channel not found!");
  }
});

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});
