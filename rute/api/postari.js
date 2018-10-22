const express = require("express");
const router = express.Router();

// @route   GET /api/postari
// @desc    testeaza ruta postari
// @access  public

router.get("/test", (req, res) => res.json({ msg: "postari functioneaza" })); //asta e de fapt ruta /api/useri/test, dar /api/useri e apelat deja din server.js

module.exports = router;
