const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaPostare(data) {
  let erori = {};

  data.text = !eGol(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 3, max: 3000 })) {
    erori.text = "postarea trebuie sa aiba intre 3 si 3000 de caractere";
  }

  if (validator.isEmpty(data.text)) {
    erori.text = "textul este necesar";
  }

  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
