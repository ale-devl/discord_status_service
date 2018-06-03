//"use strict";
const DiscordClient = require("./DiscordClient");

class ClientHandler {
    constructor(iDefaultTime) {
        this.oActiveClients = {};
        this.iDefaultTime = iDefaultTime;
    }

    setDefaultTime(iDefaultTime) {
        this.iDefaultTime = iDefaultTime;
    }

    setupClient(sToken, iDuration = this.iDefaultTime, sGameName, sStatus) {
        return new Promise((resolve, reject) => {
            let oClient = new DiscordClient(sToken, sGameName, sStatus);
            oClient.client.login(sToken)
                .then(() => {
                    this.oActiveClients[sToken] = {
                        client: oClient,
                        token: sToken,
                        timeout: setTimeout(this.destroyClient.bind(this, sToken), iDuration),
                        startTime: Date.now(),
                        duration: iDuration
                    };    
                    resolve();
                })
                .catch(err => {
                    reject(err);
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

    getTokenList() {
        return Object.keys(this.oActiveClients);
    }
}

const oClientHandler = new ClientHandler(3600000);

module.exports = oClientHandler;