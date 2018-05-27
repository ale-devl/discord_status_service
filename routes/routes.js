const express = require("express");
const User = require("./user/user");
const app = express()

app.get('/user', User.getUser);
app.post('/user', User.postUser);

app.listen(3000, console.log("Listening on Port 3000.."));