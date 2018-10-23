const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Postare = require("../../models/Postare");
const Profil = require("../../models/Profil");

//apelam validarea
const valideazaPostare = require("../../validare/postare");

// @route   GET /api/postari
// @desc    testeaza ruta postari
// @access  public

router.get("/test", (req, res) => res.json({ msg: "postari functioneaza" })); //asta e de fapt ruta /api/useri/test, dar /api/useri e apelat deja din server.js

// @route   post /api/postari
// @desc    crearea unui post
// @access  privat

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { erori, eValid } = valideazaPostare(req.body);

    if (!eValid) {
      return res.status(400).json(erori);
    }
    const postNou = new Postare({
      text: req.body.text,
      nume: req.body.nume,
      avatar: req.body.avatar,
      user: req.user.id
    });

    postNou.save().then(post => res.json(post));
  }
);

// @route   Get /api/postari
// @desc    arata postarile
// @access  public

router.get("/", (req, res) => {
  Postare.find()
    .sort({ date: -1 })
    .then(postari => res.json(postari))
    .catch(() => res.status(404).json({ mesaj: "nu sunt postari" }));
});

// @route   Get /api/postari/:id
// @desc    arata post dupa id
// @access  public

router.get("/:id", (req, res) => {
  Postare.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ mesaj: "post inexistent" }));
});

// @route   DELETE /api/postari/:id
// @desc    sterge un post dupa id
// @access  privat

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOne({ user: req.user.id }).then(profil => {
      Postare.findById(req.params.id)
        .then(postare => {
          //verificam daca cine sterge postarea a si scris-o
          if (postare.user.toString() !== req.user.id) {
            return res.status(401).json({ alerta: "postarea nu iti apartine" });
          }

          //stergerea postarii
          postare.remove().then(() => res.json({ mesaj: "postare stearsa" }));
        })
        .catch(() =>
          res.status(404).json({ mesaj: "postarea nu a fost gasita" })
        );
    });
  }
);

// @route   POST /api/postari/like/:id
// @desc    like un post
// @access  privat

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOne({ user: req.user.id }).then(profil => {
      Postare.findById(req.params.id)
        .then(postare => {
          if (
            postare.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //id-ul userului ii deja in array-ul likes a unui post, deci a dat deja like
            return res.status(400).json({ mesaj: "ai dat like deja!" });
          }
          //adauga id-ul in likes
          postare.likes.unshift({ user: req.user.id }); //se putea si postare.likes.push()
          postare.save().then(postare => res.json(postare));
        })
        .catch(() =>
          res.status(404).json({ mesaj: "postarea nu a fost gasita" })
        );
    });
  }
);

// @route   POST /api/postari/unlike/:id
// @desc    unlike un post
// @access  privat

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOne({ user: req.user.id }).then(profil => {
      Postare.findById(req.params.id)
        .then(postare => {
          if (
            postare.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            //id-ul userului ii deja in array-ul likes a unui post, deci a dat like
            return res.status(400).json({ mesaj: "nu ai dat like!" });
          }
          //index-ul like-ului
          const stergeIndex = postare.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id); //asa ne da indexul like-ului care are id-ul userului logat
          postare.likes.splice(stergeIndex, 1);
          postare.save().then(postare => res.json(postare));
        })
        .catch(() =>
          res.status(404).json({ mesaj: "postarea nu a fost gasita!" })
        );
    });
  }
);

module.exports = router;
