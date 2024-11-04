const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/clasificaciones", (req, res) => {
  conexion.query("SELECT * FROM clasificaciones", (error, rows) => {
    if (error) {
      console.error("Error al obtener clasificaciones");
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
