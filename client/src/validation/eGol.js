const eGol = val =>
  val === undefined ||
  val === null ||
  (typeof val === "object" && Object.keys(val).length === 0) || //daca e obiect gol
  (typeof val === "string" && val.trim().length === 0);

export default eGol;
