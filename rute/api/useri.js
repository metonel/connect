const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chei = require("../../config/keys");
const passport = require("passport");

//imput validation

const valideazaInregistrarea = require("../../validare/inregistrare");
const valideazaLogin = require("../../validare/logare");

//modelul User
const User = require("../../models/User");

// @route   GET /api/useri/test
// @desc    testeaza ruta useri
// @access  public

router.get("/test", (req, res) => res.json({ msg: "Useri functioneaza" })); //asta e de fapt ruta /api/useri/test, dar /api/useri e apelat deja din server.js

// @route   POST /api/useri/inregistrare
// @desc    inregistrarea unui user
// @access  public

router.post("/inregistrare", (req, res) => {
  const { erori, eValid } = valideazaInregistrarea(req.body); //ES6 destructuring
  //validare
  if (!eValid) {
    return res.status(400).json(erori);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      erori.email = "adresa de email exista deja";
      return res.status(400).json({ email: "adresa de email exista deja" }); //arunca status 400 daca eamilul exista deja
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        nume: req.body.nume,
        email: req.body.email,
        avatar, //echivalentul pt avatar: avatar, in ES6
        parola: req.body.parola
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.parola, salt, (err, hash) => {
          if (err) throw err;
          newUser.parola = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST /api/useri/login
// @desc    logare useri / returneaza tokenul (JWT -json web token)
// @access  public

router.post("/login", (req, res) => {
  const { erori, eValid } = valideazaLogin(req.body); //ES6 destructuring
  //validare
  if (!eValid) {
    return res.status(400).json(erori);
  }

  const email = req.body.email;
  const parola = req.body.parola;

  //gaseste userul dupa email
  User.findOne({ email }) //echivalentul email: email
    .then(user => {
      //user ii raspunsul pe care find il da cand gaseste
      //verifica daca exista useri

      if (!user) {
        erori.email = "email inexistent";
        return res.status(404).json(erori); //daca returnam erori.email trimitea variabila cu text, nu puteam procesa error.email sau .parola cum e mai jos, primeam o reoare cu textu respeciv si atat
      }
      //verifica parola
      bcrypt.compare(parola, user.parola).then(sePotrivesc => {
        if (sePotrivesc) {
          const payload = { id: user.id, nume: user.nume, avatar: user.avatar }; //prima variabila din semnarea tokenului e payload-ul, adica ce inf vrem in token

          //semnarea token-ului
          jwt.sign(
            payload,
            chei.cheiaSecreta,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              }); //folosim bearer token si asa se specifica
            }
          );
        } else {
          erori.parola = "parola invalida";
          return res.status(400).json(erori);
        }
      });
    });
});

// @route   GET /api/useri/current
// @desc    returneaza userul curent (a cui ii apartine tokenul)
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //session: false, pt ca nu folosim sessions
    //res.json({ msg: "succes current user" });
    res.json(req.user);
  }
);

module.exports = router;
