const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaLogin(data) {
  let erori = {};

  data.email = !eGol(data.email) ? data.email : "";
  data.parola = !eGol(data.parola) ? data.parola : "";

  if (!validator.isEmail(data.email)) {
    erori.email = "format email incorect";
  }

  if (validator.isEmpty(data.parola)) {
    erori.parola = "parola este necesara";
  }

  if (validator.isEmpty(data.email)) {
    erori.email = "campul email e necesar";
  }
  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
