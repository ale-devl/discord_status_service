"use strict";
const ClientHandler = require("../../util/ClientHandler"),
    crypto = require("crypto");

class Client {
    static getClient (req, res) {
        console.log("Client requested!");
        if (!req || !res) {
            console.error("ERROR: No req/res for getClient request!");
            return;
        } else {
            let oClient = ClientHandler.getClient(req.params.token);
            if (oClient) {
                let iRemainingTimeInSeconds = (oClient.duration - (Date.now() - oClient.startTime)) / 1000,
                    oFilteredClient = {
                        gameName: oClient.client.client.user.presence,
                        remainingTimeInSeconds: iRemainingTimeInSeconds
                    };
                res.status(200).json(oFilteredClient);
            } else {
                setTimeout(() => {res.status(204).send()}, 5000);
            }
        }
    }

    static postClient (req, res) {
        if (!req || !res) {
            console.error("ERROR: No req/res for postClient request!");
            return;
        } else {
            let sToken      = req.headers.token,
                iDuration   = req.headers.duration,
                sGameName   = req.headers.gameName,
                sStatus     = req.headers.status;

            ClientHandler.setupClient(sToken, iDuration, sGameName, sStatus)
                .then(() => {
                    res.status(201).send();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).send();
                });
        }
    }

    static isClientActive (req, res) {
        if (!req || !res) {
            console.error("ERROR: No req/res for getTokenList request!");
            return;
        } else {
            let aTokenList = ClientHandler.getTokenList();

            if(req.params.token) {
                
            }
            res.status(200).json(aEncryptedTokenList);
        }
    }
}

module.exports = Client;