const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaExp(data) {
  let erori = {};

  data.titlu = !eGol(data.titlu) ? data.titlu : "";
  data.companie = !eGol(data.companie) ? data.companie : "";
  data.deLa = !eGol(data.deLa) ? data.deLa : "";

  if (validator.isEmpty(data.titlu)) {
    erori.titlu = "titlul este necesar";
  }

  if (validator.isEmpty(data.companie)) {
    erori.companie = "compania este necesara";
  }

  if (validator.isEmpty(data.deLa)) {
    erori.deLa = "data inceperii este necesara";
  }

  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
