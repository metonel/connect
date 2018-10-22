const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaInregistrarea(data) {
  let erori = {};

  data.nume = !eGol(data.nume) ? data.nume : ""; // isEmpty din validator evalueaza numa string-uri, eGol e facut sa evalueze orice
  data.email = !eGol(data.email) ? data.email : "";
  data.parola = !eGol(data.parola) ? data.parola : "";
  data.parola2 = !eGol(data.parola2) ? data.parola2 : "";

  if (!validator.isLength(data.nume, { min: 2, max: 30 })) {
    erori.nume = "Numele trebuie sa fie intre 2 si 30 de caractere";
  }

  if (validator.isEmpty(data.nume)) {
    erori.nume = "campul Nume e necesar";
  }

  if (validator.isEmpty(data.email)) {
    erori.email = "campul email e necesar";
  }

  if (!validator.isEmail(data.email)) {
    erori.email = "format email incorect";
  }

  if (validator.isEmpty(data.parola)) {
    erori.parola = "parola este necesara";
  }

  if (!validator.isLength(data.parola, { min: 6, max: 30 })) {
    erori.parola = "parola trebuie sa fie minim 6 caractere";
  }

  if (!validator.isLength(data.parola2, { min: 6, max: 30 })) {
    erori.parola2 = "parola trebuie sa fie confirmata";
  }

  if (!validator.equals(data.parola2, data.parola)) {
    erori.parola2 = "parolele trebuie sa fie la fel";
  }

  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
