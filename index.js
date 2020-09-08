const express = require('express');
const requestado = require('request')
const app = express();

app.get("/", (req, res) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    
    
    res.sendStatus(200)
});

app.get("/gabgol", (req, res) => {
    res.send('gabgol')
})

app.get("/bits", (req, res) => {
    res.send('bits')
})

app.listen(8080); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const { prefix } = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
const { token } = require("./mytoken.json"); //Pegando o prefixo do bot para respostas de comandos
const files = ['gabgol', 'bits', 'theo', 'fernando', 'vicente']

client.login(token); //Ligando o Bot caso ele consiga acessar o token

function call(connection) {
    let numero
    const pessoa = random(0, 3)
    if(pessoa === 0){
        numero = random(1, 24)
    } else if(pessoa === 1){
        numero = random(1, 25)
    } else if(pessoa === 2){ 
        numero = random(1, 12)
    }
    const audio = './src/audios/' + files[pessoa] + '_' + numero.toString() + '.mp3'
    const dispatcher = connection.play(audio)
    console.log(audio)

    dispatcher.on('start', () => {

    });
    dispatcher.on('finish', () => {
        setTimeout(() => {
            client.on('message', message => {
                if (message.member.voice.channel && message.content === `${prefix} stop`) {
                    const disconnection = message.member.voice.channel.leave();
                }
            })
            call(connection)

        }, random(45000, 300000))
    });
    dispatcher.on('error', console.error)
}


client.on('message', message => {
    if (message.content === `${prefix} start`) {
        const VC = message.member.voice.channel;
        if (!VC)
            return message.reply("Você n ta numa call o cabeção")
        VC.join()
            .then(connection => {
                call(connection)
            })
            .catch(console.error);
    }
})



const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
