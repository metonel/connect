const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaProfil(data) {
  let erori = {};

  data.handle = !eGol(data.handle) ? data.handle : "";
  data.status = !eGol(data.status) ? data.status : "";
  data.abilitati = !eGol(data.abilitati) ? data.abilitati : "";
  data.website = !eGol(data.website) ? data.website : "";
  data.youtube = !eGol(data.youtube) ? data.youtube : "";
  data.linkedIn = !eGol(data.linkedIn) ? data.linkedIn : "";
  data.insta = !eGol(data.insta) ? data.insta : "";
  data.fbk = !eGol(data.fbk) ? data.fbk : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    erori.handle = "handle trebuie sa fie intre 2 si 40 de caractere";
  }

  if (validator.isEmpty(data.handle)) {
    erori.handle = "handle-ul asociat profililui este necesar";
  }

  if (validator.isEmpty(data.status)) {
    erori.status = "campul status este necesar";
  }

  if (validator.isEmpty(data.abilitati)) {
    erori.abilitati = "campul abilitati este necesar";
  }

  if (!validator.isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      erori.website = "campul website nu contine un URL valid";
    }
  }

  if (!validator.isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      erori.youtube = "campul youtube nu contine un URL valid";
    }
  }

  if (!validator.isEmpty(data.linkedIn)) {
    if (!validator.isURL(data.linkedIn)) {
      erori.linkedIn = "campul linkedIn nu contine un URL valid";
    }
  }

  if (!validator.isEmpty(data.insta)) {
    if (!validator.isURL(data.insta)) {
      erori.insta = "campul instagram nu contine un URL valid";
    }
  }

  if (!validator.isEmpty(data.fbk)) {
    if (!validator.isURL(data.fbk)) {
      erori.fbk = "campul facebook nu contine un URL valid";
    }
  }

  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
