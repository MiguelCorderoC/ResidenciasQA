const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/clientes", (req, res) => {
  conexion.query("SELECT * from clientes", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
