"use strict";
const ClientHandler = require("../../util/ClientHandler"),
    DiscordClient = require("../../util/DiscordClient");

class Client {
    static getClient (req, res) {
        console.log("getClient");
            let oClient = ClientHandler.getClient(req.params.token);
            if (oClient) {
                let iRemainingTimeInSeconds = (oClient.duration - (Date.now() - oClient.startTime)) / 1000,
                    oFilteredClient = {
                        gameName: oClient.client.client.user.presence,
                        remainingTimeInSeconds: iRemainingTimeInSeconds
                    };
                res.status(200).json(oFilteredClient);
            } else {
                res.status(204).send();
            }
    }

    static postClient (req, res) {
        console.log("postClient");
        let oClientConfiguration = {
            token: req.params.token,
            duration: req.params.duration,
            gameName: req.params.gameName,
            status: req.params.status
        };
        ClientHandler.setupClient(oClientConfiguration)
            .then(() => {
                let oFilteredClient = {
                    gameName: oClientConfiguration.gameName,
                    remainingTimeInSeconds: duration
                };
                res.status(201).json(oFilteredClient);
            })
            .catch(err => {
                console.error("Error setting up client. Note: This can be due to all kinds of reasons and a proper error handling needs to be implemented!");
                res.status(400).send();
            });
    }

    static getIsTokenValid (req, res) {
        console.log("Token validation check..");
        DiscordClient.testToken(req.params.token)
            .then(() => res.status(200).send())
            .catch(() => res.status(400).send());
    }

    static putClient (req, res) {
        console.log("putClient");
        let oClientConfiguration = {
            token: req.params.token,
            duration: req.params.duration,
            gameName: req.params.gameName,
            status: req.params.status
        };

        ClientHandler.updateClient(oClientConfiguration)
            .then(res.status(204).send())
            .catch(err =>
                {
                    switch(err.error) {
                        case 404:
                            res.status(404).send();
                            break;
                    }
                });
    }

    static deleteClient (req, res) {
        console.log("deleteClient");
        ClientHandler.deleteClient(req.params.token)
            .then(res.status(200).send())
            .catch(res.status(404).send());
    }
}

module.exports = Client;