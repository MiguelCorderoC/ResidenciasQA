const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/cotizaciones", (req, res) => {
  conexion.query("SELECT * FROM vista_clientes_cotizaciones", (error, rows) => {
    if (error) {
      console.error("Error al obtener cotizaciones ", error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
