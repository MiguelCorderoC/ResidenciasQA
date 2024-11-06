const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/tipos-ventas", (req, res) => {
  conexion.query("SELECT * FROM tipos_ventas", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
