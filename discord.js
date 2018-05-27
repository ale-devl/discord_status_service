const Client = require("discord.js");

class DiscordClient {
    constructor(sToken, iDuration) {
        this.client = new Client.Client();
        this.client.on('ready', genericOnCallback.bind(this));
        this.client.login(sToken)
            .then(() => {
                setTimeout(this.destroySession, iDuration);
            })
            .catch(err => {
                console.log("Invalid token");
                delete this;
            });
    }

    destroySession() {
        console.log("Destroying myself!");
        this.client.destroy();
        delete this;
    }
}

function genericOnCallback(sGameName, sStatus) {
    this.client.user.setPresence({
        game: {
            name: sGameName,
            type: 0
        },
        afk: false,
        status: sStatus
    });
}

module.exports = DiscordClient;