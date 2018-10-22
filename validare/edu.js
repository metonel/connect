const validator = require("validator");
const eGol = require("./e-gol");

module.exports = function valideazaEdu(data) {
  let erori = {};

  data.scoala = !eGol(data.scoala) ? data.scoala : "";
  data.tipul = !eGol(data.tipul) ? data.tipul : "";
  data.specializare = !eGol(data.specializare) ? data.specializare : "";
  data.deLa = !eGol(data.deLa) ? data.deLa : "";

  if (validator.isEmpty(data.scoala)) {
    erori.scoala = "numele instiutiei de invatamant este necesar";
  }

  if (validator.isEmpty(data.tipul)) {
    erori.tipul = "tipul instiutiei de invatamant este necesar";
  }

  if (validator.isEmpty(data.specializare)) {
    erori.specializare = "specializarea este necesara";
  }

  if (validator.isEmpty(data.deLa)) {
    erori.deLa = "data inceperii este necesara";
  }

  return {
    erori, //asta ii echiv erori: erori
    eValid: eGol(erori)
  }; //returneaza un obiect, cu un obiect erori si un boolean eValid
};
