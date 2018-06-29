//"use strict";
const DiscordClient = require("./DiscordClient"),
    Discord = require("Discord.js");

class ClientHandler {
    constructor(iDefaultTime) {
        this.oActiveClients = {};
        this.iDefaultTime = iDefaultTime;
    }

    setDefaultTime(iDefaultTime) {
        this.iDefaultTime = iDefaultTime;
    }

    setupClient(oClientConfiguration) {
        return new Promise((resolve, reject) => {
            let oClient = new DiscordClient(oClientConfiguration.token, oClientConfiguration.gameName, oClientConfiguration.status);
            oClient.client.login(oClientConfiguration.token)
                .then(() => {
                    this.oActiveClients[sToken] = {
                        client: oClient,
                        token: oClientConfiguration.token,
                        timeout: setTimeout(this.destroyClient.bind(this, oClientConfiguration.token), oClientConfiguration.duration || this.iDefaultTime),
                        startTime: Date.now(),
                        duration: oClientConfiguration.duration || this.iDefaultTime
                    };
                    resolve();
                })
                .catch(err => {
                    reject({errorText: "Login failed", error: 400});
                })
        })
    }

    getClient(sToken) {
        return this.oActiveClients[sToken];
    }

    destroyClient(sToken) {
        this.oActiveClients[sToken].client.destroySession();
        delete this.oActiveClients[sToken];
    }

    updateClientTimeout(sToken, iNewDuration) {
        if(this.oActiveClients[sToken]) {
            clearTimeout(this.oActiveClients[sToken].timeout);
            this.oActiveClients[sToken].timeout = setTimeout(this.destroyClient.bind(this, sToken), iNewDuration);
        }
    }

    updateClient(oClientConfiguration) {
        return new Promise((resolve, reject) => {
            if(this.oActiveClients[oClientConfiguration.token]) {
                let oClient = this.oActiveClients[oClientConfiguration.token],
                    oPresence = {
                    game: {
                        name: oClientConfiguration.gameName,
                        type: 0
                    },
                    status: oClientConfiguration.status
                };

                oClient.client.setPresence(oPresence);
                oClient.updateClientTimeout(oClientConfiguration.token, oClientConfiguration.duration);
                resolve();
            } else {
                reject({ errorText: "No client found", error: 404 });
            }
        });
    }

    deleteClient(sToken) {
        return new Promise((resolve, reject) => {
            if(this.oActiveClients[sToken]) {
                let oClient = this.oActiveClients[sToken];
                oClient.updateClientTimeout(sToken, 0);
                resolve();
            } else {
                reject({error: 404, errorText: "No client found for provided token"});
            }
        });
    }
}

const oClientHandler = new ClientHandler(3600000);

module.exports = oClientHandler;