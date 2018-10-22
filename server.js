const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //cu body parser putem accesa req.body. orice parte din body vrem
const passport = require("passport");

const useri = require("./rute/api/useri");
const profil = require("./rute/api/profil");
const postari = require("./rute/api/postari");

const app = express();

//body-parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB

const db = require("./config/keys").mongoURI; //keys.js exporta elementul mongoURI

//conectare la mongodb prin mongoose

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB conectare ok"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("hello lume!"));

//middleware pt passport

app.use(passport.initialize());

//config file pt passport

require("./config/passport")(passport);

//rute

app.use("/api/useri", useri);
app.use("/api/profil", profil);
app.use("/api/postari", postari);

const port = process.env.PORT || 5000; // .env.PORT ii pt herocu, 5000 ii pt local

app.listen(port, () => console.log(`server functional pe portul ${port}`));
