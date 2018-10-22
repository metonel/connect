//functie care verifica daca dif tipuri de variabile sunt goale

// function eGol(val) {
//   return (
//     val === undefined ||
//     val === null ||
//     (typeof val === "object" && Object.keys(value).length === 0) || //daca e obiect gol
//     (typeof val === "string" && val.trim().length === 0)
//   );
// } //cu arrow fct devine: (nu mai trebuieste return si {})

const eGol = val =>
  val === undefined ||
  val === null ||
  (typeof val === "object" && Object.keys(val).length === 0) || //daca e obiect gol
  (typeof val === "string" && val.trim().length === 0);

module.exports = eGol;
