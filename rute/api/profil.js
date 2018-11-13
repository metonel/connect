const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//apelam validarea
const valideazaProfil = require("../../validare/profil");
const valideazaExp = require("../../validare/exp");
const valideazaEdu = require("../../validare/edu");

const Profil = require("../../models/Profil");
const User = require("../../models/User");

// @route   GET /api/profil
// @desc    testeaza ruta profil
// @access  public

router.get("/test", (req, res) => res.json({ msg: "Profil functioneaza" })); //asta e de fapt ruta /api/useri/test, dar /api/useri e apelat deja din server.js

// @route   GET /api/profil
// @desc    profilul userului curent
// @access  private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const erori = {};

    Profil.findOne({ user: req.user.id })
      .populate("user", ["nume", "avatar"]) //scoate din colectia user campurile nume si avatar sa le putem folosi
      .then(profil => {
        if (!profil) {
          erori.profil = "acest user nu are profil";
          return res.status(404).json(erori);
        }
        res.json(profil);
      })
      .catch(err =>
        res.status(404).json({ profil: "nu exista profil pt acest user" })
      );
  }
); //jwt e strategia facuta in fis de conf

// @route   POST /api/profil/all
// @desc    afisarea tuturor profilelor
// @access  public

router.get("/all", (req, res) => {
  const erori = {};
  Profil.find()
    .populate("user", ["nume", "avatar"])
    .then(profile => {
      if (!profile) {
        erori.profile = "nu exista niciun profil";
        return res.status(404).json(erori);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST /api/profil/handle/:handle
// @desc    afisarea profilului dupa handle
// @access  public

router.get("/handle/:handle", (req, res) => {
  const erori = {};
  Profil.findOne({ handle: req.params.handle })
    .populate("user", ["nume", "avatar"])
    .then(profil => {
      if (!profil) {
        erori.profil = "acest user nu are profil";
        res.status(404).json(erori);
      }

      res.json(profil);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST /api/profil/user/:uder_id
// @desc    afisarea profilului dupa id
// @access  public

router.get("/user/:user_id", (req, res) => {
  const erori = {};
  Profil.findOne({ user: req.params.user_id })
    .populate("user", ["nume", "avatar"])
    .then(profile => {
      if (!profile) {
        erori.profil = "acest user nu are profil";
        res.status(404).json(erori);
      }

      res.json(profil);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST /api/profil
// @desc    creaza/editeaza profil
// @access  private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }), //e ruta privata si e nevoie de autentificare
  (req, res) => {
    //apeleaza validarea
    const { erori, eValid } = valideazaProfil(req.body);

    //verifica validarea
    if (!eValid) {
      //returneaza erorile cu status 400
      return res.status(400).json(erori);
    }

    //procesarea campurilor
    const campuriProfil = {}; //aici punem tot ce vine din form-ul din frontend pana cand le salvam in DB
    campuriProfil.user = req.user.id;
    if (req.body.handle) campuriProfil.handle = req.body.handle;
    if (req.body.companie) campuriProfil.companie = req.body.companie;
    if (req.body.website) campuriProfil.website = req.body.website;
    if (req.body.locatie) campuriProfil.locatie = req.body.locatie;
    if (req.body.status) campuriProfil.status = req.body.status;
    if (req.body.abilitati) campuriProfil.abilitati = req.body.abilitati;
    if (req.body.bio) campuriProfil.bio = req.body.bio;
    if (req.body.gitUser) campuriProfil.gitUser = req.body.gitUser;

    //abilitati - trebuiesc impartite in array

    if (typeof req.body.abilitati !== "undefiend") {
      campuriProfil.abilitati = req.body.abilitati.split(",");
    }

    //social

    campuriProfil.social = {};
    if (req.body.youtube) campuriProfil.social.youtube = req.body.youtube;
    if (req.body.linkedIn) campuriProfil.social.linkedIn = req.body.linkedIn;
    if (req.body.insta) campuriProfil.social.insta = req.body.insta;
    if (req.body.fbk) campuriProfil.social.fbk = req.body.fbk;

    Profil.findOne({ user: req.user.id }).then(profil => {
      if (profil) {
        //daca e profilul, inseamna ca il editam

        /// UPDATE  NU MERGE ! ! ! !

        Profil.findOneAndUpdate(
          { user: req.body.id },
          { $set: campuriProfil },
          { new: true }
        ).then(profil => res.json(profil));
      } else {
        //creare profil

        //handle ii pt seo friendly, face link gen connect.ro/ToniNemtisor
        Profil.findOne({ handle: campuriProfil.handle }).then(profil => {
          if (profil) {
            erori.handle = "handle deja existent!";
            res.status(400).json(erori);
          }
          //salvare profil
          new Profil(campuriProfil).save().then(profil => res.json(profil));
        });
      }
    });

    //if (req.body.gitUser) campuriProfil.gitUser = req.body.gitUser;
  }
);

// @route   POST /api/exp
// @desc    creaza/editeaza experienta la profil
// @access  private

router.post(
  "/exp",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //apeleaza validarea
    const { erori, eValid } = valideazaExp(req.body);

    //verifica validarea
    if (!eValid) {
      //returneaza erorile cu status 400
      return res.status(400).json(erori);
    }
    Profil.findOne({ user: req.user.id }).then(profil => {
      const newExp = {
        titlu: req.body.titlu,
        companie: req.body.companie,
        locatie: req.body.locatie,
        deLa: req.body.deLa,
        panaLa: req.body.panaLa,
        curent: req.body.curent,
        descriere: req.body.descriere
      };

      //adaugare la experienta
      profil.experienta.unshift(newExp);
      profil.save().then(profil => res.json(profil));
    });
  }
);

// @route   DELETE /api/profil/exp/:exp_id
// @desc    sterge o experienta din profil
// @access  private

router.delete(
  "/exp/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOne({ user: req.user.id })
      .then(profil => {
        //gasim indexul exp ce o vrem stearsa
        const stergeIndex = profil.experienta
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice din array
        profil.experienta.splice(stergeIndex, 1);

        //salvare
        profil.save().then(profil => res.jsonp(profil));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST /api/edu
// @desc    adauga o educatie la profil
// @access  private

router.post(
  "/edu",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //apeleaza validarea
    const { erori, eValid } = valideazaEdu(req.body);

    //verifica validarea
    if (!eValid) {
      //returneaza erorile cu status 400
      return res.status(400).json(erori);
    }
    Profil.findOne({ user: req.user.id }).then(profil => {
      const newEdu = {
        scoala: req.body.scoala,
        tipul: req.body.tipul,
        specializare: req.body.specializare,
        deLa: req.body.deLa,
        panaLa: req.body.panaLa,
        curent: req.body.curent,
        descriere: req.body.descriere
      };

      //adaugare la bd
      profil.educatie.unshift(newEdu);
      profil.save().then(profil => res.json(profil));
    });
  }
);

// @route   DELETE /api/profil/edu/:edu_id
// @desc    sterge o educatie din profil
// @access  private

router.delete(
  "/edu/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOne({ user: req.user.id })
      .then(profil => {
        //gasim indexul exp ce o vrem stearsa
        const stergeIndex = profil.educatie
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice din array
        profil.educatie.splice(stergeIndex, 1);

        //salvare
        profil.save().then(profil => res.jsonp(profil));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE /api/profil
// @desc    sterge un profil
// @access  private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profil.findOneAndRemove({ user: req.user.id }).then(() => {
      //ce e in arroe fct e pt a sterge si userul, daca se dorea doar stergerea
      User.findByIdAndRemove({ _id: req.user.id }).then(() =>
        res.json({ mesaj: "user sters" })
      );
    });
  }
);

module.exports = router;
