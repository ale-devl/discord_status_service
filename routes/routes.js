"use strict";
module.exports = function (app) {
    const ApplicationKeyHandler = require("../util/ApplicationKeyHandler"),
        cors = require("cors"),
        Client = require("./client/Client");

    app.use(cors({origin: "*"}));

    app.route('/client')
        .post([ApplicationKeyHandler.checkKey, Client.postClient]);

    app.route('/client/:token')
        .get([ApplicationKeyHandler.checkKey, Client.getClient]);

    app.route('/activeTokens')
        .get([ApplicationKeyHandler.checkKey, Client.isClientActive]);
}