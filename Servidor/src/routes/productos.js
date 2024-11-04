const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/productos", (req, res) => {
  conexion.query(
    "SELECT * FROM vista_productos_subclasificaciones",
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

module.exports = router;
