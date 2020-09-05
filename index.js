const express = require('express');
const app = express();

app.get("/", (request, response) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    response.sendStatus(200);
});

app.listen(8080); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const { prefix, token } = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
const audio = "./audio_1.mp3"


client.login(token); //Ligando o Bot caso ele consiga acessar o token


client.on('message', async message => {
    if (message.member.voice.channel && message.content === `${prefix} join`) {
        const connection = await message.member.voice.channel.join()
        client.on('message', message => {
            if (message.content === `${prefix} start`) {
                var VC = message.member.voice.channel;
                if (!VC)
                    return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
                VC.join()
                    .then(connection => {
                        const dispatcher = connection.play(audio);
                        dispatcher.on("end", end => { VC.leave() });
                    })
                    .catch(console.error);
            }
        })
    }
})



client.on('message', message => {
    if (message.member.voice.channel && message.content === `${prefix} stop`) {
        const disconnection = message.member.voice.channel.leave();
    }
})

client.on('message', async message => {
    if (message.content === `${prefix}`) {
        message.channel.send("vovo")
    }
})

const random = (min, max) => {
    return ~~(Math.random() * (max - min + 1)) + min
}

