"use strict";
const express   = require("express"),
    app         = express(),
    iPort        = process.env.PORT || 3000;
require("../routes/routes")(app);

app.listen(iPort, () => console.log("Listening on Port: " + iPort));