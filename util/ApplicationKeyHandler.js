"use strict";
const sCurrentKey = getCurrentKey(),
    bDebug = process.env.NODE_ENV === "dev";

class ApplicationKeyHandler {
    static checkKey(req, res, next) {
        if (req.query.appkey === sCurrentKey || bDebug)  {
            next();
        } else {
            console.log("Invalid AppKey used");
            res.status(400).send();
        }
    }
}

function getCurrentKey() {
    let sKey = "ThisShouldBeReplacedBySomeSuperSecureKeyLogic";
    return sKey;
}

module.exports = ApplicationKeyHandler;