const Discord = require("discord.js");
const client = new Discord.Client();
var credidentials = require("./credidentials.json");
var googleTranslate = require('google-translate')(credidentials["api_key"]);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var translated = false;
    googleTranslate.detectLanguage(msg.content, function(err, detection) {
        if(err) return;
        if(detection.language != "en"){
            if(translated) return;
            googleTranslate.translate(msg.content, "en", function(err, translation) {
                if(translated) return;
                if(err) return;
                msg.channel.send(`Translated: ${translation.translatedText}`);
                translated = true;
            });
        }
    });
});

client.login(credidentials["bot_token"]);