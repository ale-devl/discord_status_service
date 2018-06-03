"use strict";
const Client = require("discord.js");

class DiscordClient {
    constructor(sGameName, sStatus) {
        this.client = new Client.Client();
        this.client.on('ready', genericOnCallback.bind(this, sGameName, sStatus));
    }

    destroySession() {
        this.client.destroy();
        delete this;
    }
}

function genericOnCallback(sGameName, sStatus) {
    return;
    this.client.user.setPresence({
        game: {
            name: sGameName,
            type: 0
        },
        afk: false,
        status: sStatus // online, offline, idle, dnd
    });
}

module.exports = DiscordClient;