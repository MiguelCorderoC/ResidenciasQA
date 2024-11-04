const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/subclasificaciones", (req, res) => {
  conexion.query(
    "SELECT * FROM vista_clasificaciones_subclasificaciones",
    (error, rows) => {
      if (error) {
        console.error("Error al obtener subclasificaciones");
      } else {
        res.send(rows);
      }
    }
  );
});
module.exports = router;
